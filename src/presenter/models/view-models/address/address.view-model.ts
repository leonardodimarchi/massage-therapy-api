import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityViewModel } from "../shared/base-entity.view-model";

export class AddressViewModel extends BaseEntityViewModel {
    @ApiProperty()
    state: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    neighborhood: string;

    @ApiProperty()
    houseNumber: number;

    @ApiProperty()
    userId: number;
}