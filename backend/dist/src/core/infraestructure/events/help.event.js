"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpEvent = void 0;
const auth_event_entity_1 = require("@domain/events/auth.event.entity");
const error_socket_helper_1 = require("../helpers/error-socket.helper");
const distance_helper_1 = require("../helpers/distance.helper");
const assistance_repository_1 = require("@framework/mongo/repositories/assistance.repository");
const axios_1 = __importDefault(require("axios"));
var events;
(function (events) {
    events["search_help"] = "search_help";
    events["mechanic_available"] = "mechanic_available";
    events["mechanic_available_confirm"] = "mechanic_available_confirm";
    events["help_no_mechanic_available"] = "help_no_mechanic_available";
    events["help_confirm"] = "help_confirm";
    events["mechanic_no_selected"] = "mechanic_no_selected";
})(events || (events = {}));
const mechanicConfirmations = {};
class HelpEvent {
    constructor(io, context) {
        this.io = io;
        this.context = context;
        this.assistanceRepository = new assistance_repository_1.AssistanceRepository();
        this.io.on('connection', (socket) => {
            socket.on(events.search_help, async (data) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                try {
                    const userInfo = this.context.users[socket.id];
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    const requestInProgress = await this.assistanceRepository.getByUserId(userInfo.userId);
                    if (requestInProgress)
                        return (0, error_socket_helper_1.errorSocket)(socket, "The user has a request in progress");
                    const addressAssist = await axios_1.default.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${data.lat}&lon=${data.lng}`);
                    const addressAssistComplete = {
                        tourism: (_b = (_a = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.tourism,
                        road: (_d = (_c = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.road,
                        neighbourhood: (_f = (_e = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.neighbourhood,
                        city: (_h = (_g = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _g === void 0 ? void 0 : _g.address) === null || _h === void 0 ? void 0 : _h.city,
                        postcode: (_k = (_j = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _j === void 0 ? void 0 : _j.address) === null || _k === void 0 ? void 0 : _k.postcode,
                        country: (_m = (_l = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _l === void 0 ? void 0 : _l.address) === null || _m === void 0 ? void 0 : _m.country,
                        country_code: (_p = (_o = addressAssist === null || addressAssist === void 0 ? void 0 : addressAssist.data) === null || _o === void 0 ? void 0 : _o.address) === null || _p === void 0 ? void 0 : _p.country_code,
                    };
                    const userLocation = {
                        idUser: userInfo.userId,
                        latUser: data.lat,
                        lngUser: data.lng,
                        address: addressAssistComplete,
                        fullName: userInfo.fullName,
                        photo: userInfo.photo,
                        rating: userInfo.rating,
                    };
                    this.io.in(auth_event_entity_1.RoleEvent.mechanic).emit(events.mechanic_available, userLocation);
                    setTimeout(async () => {
                        if (mechanicConfirmations[userInfo.userId]) {
                            const sortedMechanics = mechanicConfirmations[userInfo.userId]
                                .sort((a, b) => a.distance - b.distance);
                            const mechanicSelected = sortedMechanics[0];
                            const restMechanics = sortedMechanics.slice(1);
                            const existAssistance = await this.assistanceRepository
                                .getByParticipants(userInfo.userId, mechanicSelected.mechanic.idMechanic);
                            if (existAssistance)
                                return (0, error_socket_helper_1.errorSocket)(socket, "There is already assistance in progress");
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
                            restMechanics.forEach(mechanicConfim => socket.to(mechanicConfim === null || mechanicConfim === void 0 ? void 0 : mechanicConfim.mechanic["socketId"])
                                .emit(events.mechanic_no_selected, {}));
                            delete mechanicConfirmations[userInfo.userId];
                        }
                        else {
                            socket.emit(events.help_no_mechanic_available, "No mechanic available");
                        }
                    }, 30000);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
            socket.on(events.mechanic_available_confirm, async (data) => {
                try {
                    const userInfo = this.context.users[socket.id];
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    const assitanceInProgress = await this.assistanceRepository.getByMechanicId(data.mechanic.idMechanic);
                    if (assitanceInProgress)
                        return (0, error_socket_helper_1.errorSocket)(socket, "The mechanic has a service in progress");
                    const confirmation = {
                        user: { ...data.user },
                        mechanic: {
                            ...data.mechanic,
                            fullName: userInfo.fullName,
                            photo: userInfo.photo,
                            rating: userInfo.rating,
                            socketId: socket.id
                        },
                        distance: (0, distance_helper_1.distanceInKm)({ lat: data.user.latUser, lng: data.user.lngUser }, { lat: data.mechanic.latMechanic, lng: data.mechanic.lngMechanic })
                    };
                    if (!mechanicConfirmations[data.user.idUser]) {
                        mechanicConfirmations[data.user.idUser] = [confirmation];
                    }
                    if (mechanicConfirmations[data.user.idUser].
                        filter(confirmation => confirmation.mechanic.idMechanic === data.mechanic.idMechanic).length === 0) {
                        mechanicConfirmations[data.user.idUser].push(confirmation);
                    }
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
        });
    }
}
exports.HelpEvent = HelpEvent;
