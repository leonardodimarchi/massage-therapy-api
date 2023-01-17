import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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

    @ApiPropertyOptional()
    diseaseHistory?: string;
}