import { Roles } from "@domain/user/user.entity";
import { IsEnum, IsNotEmpty, Matches } from "class-validator";
import { analyticsDtoMessages } from "./analytics.dto.messages";

export class CreateAnalyticsDTO {
    @IsNotEmpty({ message: analyticsDtoMessages.titleRequired })
    title: string;
}

export class AssistanceAnalyticsDTO {
    @Matches(/(^$)|^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "El filtro Fecha de inicio debe tener el formato yyyy-mm-dd"
    })
    startDate: string;
    @Matches(/(^$)|^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "El filtro Fecha de término debe tener el formato yyyy-mm-dd"
    })
    endDate: string;
    page: number;
    rowsPerPage: number;
}

export class SessionsAnalyticsDTO {
    @Matches(/(^$)|^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "El filtro Fecha de inicio debe tener el formato yyyy-mm-dd"
    })
    startDate: string;
    @Matches(/(^$)|^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "El filtro Fecha de término debe tener el formato yyyy-mm-dd"
    })
    endDate: string;
    page: number;
    rowsPerPage: number;
}