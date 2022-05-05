import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { rateAssitanceMessages, assistanceFilterDtoMessages } from './assistance.dto.messages';
import { AssistanceFilterStatus } from './assistance.entity';

export class MyAssistsDTO {
    page: number;
    rowsPerPage: number;
}

export class RateAssistance {
    @IsNotEmpty({ message: rateAssitanceMessages.idAssistanceRequired })
    @IsMongoId({ message: rateAssitanceMessages.idAssitanceInvalid })
    id_assistance: string;

    @IsNumber({ allowInfinity: false }, { message: rateAssitanceMessages.scoreIsNumber })
    @Min(1, { message: rateAssitanceMessages.scoreMinValue })
    @Max(5, { message: rateAssitanceMessages.scoreMaxValue })
    score: number;
}


export class GetAssistancesFilterDTO {
    @IsEnum(AssistanceFilterStatus, { message: assistanceFilterDtoMessages.statusInvalid })
    status: string;
    name: string;
    page: number;
    rowsPerPage: number;
}