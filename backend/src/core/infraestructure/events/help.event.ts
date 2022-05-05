import { Server, Socket } from "socket.io";
import { RoleEvent } from "@domain/events/auth.event.entity";
import { SocketContext } from "@bootstrap/Express/ExpressSocketIO.server";
import { errorSocket } from "../helpers/error-socket.helper";
import { MechanicConfirmations, MechanicConfirmHelpEntity, SearchHelpEntity } from "@domain/events/help.event.entity";
import { distanceInKm } from '../helpers/distance.helper';
import { AssistanceRepository } from "@framework/mongo/repositories/assistance.repository";
import { UserLocationData } from "@domain/events/location.event.entity";
import axios from "axios";

enum events {
    search_help = "search_help",
    mechanic_available = "mechanic_available",
    mechanic_available_confirm = "mechanic_available_confirm",
    help_no_mechanic_available = "help_no_mechanic_available",
    help_confirm = "help_confirm",
    mechanic_no_selected = "mechanic_no_selected",
}

const mechanicConfirmations: MechanicConfirmations = {};
export class HelpEvent {
    assistanceRepository = new AssistanceRepository();

    constructor(
        private io: Server,
        private context: SocketContext,
    ) {
        this.io.on('connection', (socket: Socket) => {
            socket.on(events.search_help, async (data: SearchHelpEntity) => {
                try {
                    const userInfo = this.context.users[socket.id];
                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");

                    const requestInProgress = await this.assistanceRepository.getByUserId(userInfo.userId);
                    if (requestInProgress) return errorSocket(socket, "The user has a request in progress");
                    const addressAssist = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${ data.lat }&lon=${ data.lng }`);
                    const addressAssistComplete = {
                        tourism: addressAssist?.data?.address?.tourism,
                        road: addressAssist?.data?.address?.road,
                        neighbourhood: addressAssist?.data?.address?.neighbourhood,
                        city: addressAssist?.data?.address?.city,
                        postcode: addressAssist?.data?.address?.postcode,
                        country: addressAssist?.data?.address?.country,
                        country_code: addressAssist?.data?.address?.country_code,
                    };

                    const userLocation: UserLocationData = {
                        idUser: userInfo.userId,
                        latUser: data.lat,
                        lngUser: data.lng,
                        address: addressAssistComplete,
                        fullName: userInfo.fullName,
                        photo: userInfo.photo,
                        rating: userInfo.rating,
                    };


                    this.io.in(RoleEvent.mechanic).emit(events.mechanic_available, userLocation);

                    setTimeout(async () => {
                        if (mechanicConfirmations[userInfo.userId]) {
                            const sortedMechanics = mechanicConfirmations[userInfo.userId]
                                .sort((a, b) => a.distance - b.distance);
                            const mechanicSelected = sortedMechanics[0];
                            const restMechanics = sortedMechanics.slice(1,);

                            const existAssistance = await this.assistanceRepository
                                .getByParticipants(userInfo.userId, mechanicSelected.mechanic.idMechanic);
                            if (existAssistance) return errorSocket(socket, "There is already assistance in progress");

                            const newAssistance = await this.assistanceRepository.create({
                                userId: userInfo.userId,
                                mechanicId: mechanicSelected.mechanic.idMechanic,
                                destination: {
                                    lat: mechanicSelected.user.latUser,
                                    lng: mechanicSelected.user.lngUser
                                },
                                destinationAddress: {
                                    ...addressAssistComplete
                                }
                            });


                            socket.emit(events.help_confirm, {
                                ...mechanicSelected,
                                idAssistance: newAssistance._id,
                            });

                            restMechanics.forEach(mechanicConfim => socket.to(mechanicConfim?.mechanic["socketId"])
                                .emit(events.mechanic_no_selected, {}));

                            delete mechanicConfirmations[userInfo.userId];
                        } else {
                            socket.emit(events.help_no_mechanic_available, "No mechanic available");
                        }
                    }, 30000);
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });


            socket.on(events.mechanic_available_confirm, async (data: MechanicConfirmHelpEntity) => {
                try {
                    const userInfo = this.context.users[socket.id];
                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");

                    const assitanceInProgress = await this.assistanceRepository.getByMechanicId(data.mechanic.idMechanic);
                    if (assitanceInProgress) return errorSocket(socket, "The mechanic has a service in progress");

                    const confirmation = {
                        user: { ...data.user },
                        mechanic: {
                            ...data.mechanic,
                            fullName: userInfo.fullName,
                            photo: userInfo.photo,
                            rating: userInfo.rating,
                            socketId: socket.id
                        },
                        distance: distanceInKm({ lat: data.user.latUser, lng: data.user.lngUser },
                            { lat: data.mechanic.latMechanic, lng: data.mechanic.lngMechanic })
                    };

                    if (!mechanicConfirmations[data.user.idUser]) {
                        mechanicConfirmations[data.user.idUser] = [confirmation];
                    }
                    if (mechanicConfirmations[data.user.idUser].
                        filter(confirmation => confirmation.mechanic.idMechanic === data.mechanic.idMechanic).length === 0) {
                        mechanicConfirmations[data.user.idUser].push(confirmation);
                    }
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });
        });
    }
}