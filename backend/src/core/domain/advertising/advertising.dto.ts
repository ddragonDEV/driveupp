import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, Matches, ValidateNested } from "class-validator";
import { urlRegexNotBlank } from "../../../../src/shared/helpers/commonRegex";

class BannerDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "La url de la imagen es requerida" })
    @Matches(urlRegexNotBlank, { message: "La imagen no contiene una url válida" })
    image: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "El mensaje es requerido" })
    message: string;
}



export class CreateAdvertisingDTO {
    @Type(() => BannerDTO)
    @IsArray({ message: "Los banners son un arreglo" })
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: "Se quiere al menos un banner" })
    banners: BannerDTO[];
}


export class UpdateAdvertisingDTO {
    @IsNotEmpty({ message: "El id es obligatorio" })
    @IsMongoId({ message: "El id no es válido" })
    _id: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "La url de la imagen es requerida" })
    @Matches(urlRegexNotBlank, { message: "La imagen no contiene una url válida" })
    image: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "El mensaje es requerido" })
    message: string;
}

export class DeleteAdvertisingDTO {
    @IsNotEmpty({ message: "El id es obligatorio" })
    @IsMongoId({ message: "El id no es válido" })
    _id: string;
}