import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AddressViewModel } from "../address/address.view-model";
import { BaseEntityViewModel } from "../shared/base-entity.view-model";

export class UserViewModel extends BaseEntityViewModel {
    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty()
    gender: UserGenderEnum;

    @ApiPropertyOptional()
    diseaseHistory?: string;

    @ApiPropertyOptional()
    address?: AddressViewModel;
}