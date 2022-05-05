import { IsNotEmpty } from "class-validator";
import { sessionhistoryDtoMessages } from "./sessionhistory.dto.messages";

export class CreateSessionHistoryDTO {
    @IsNotEmpty({ message: sessionhistoryDtoMessages.titleRequired })
    title: string; 
}