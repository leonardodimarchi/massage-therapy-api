import { ApiProperty } from "@nestjs/swagger";

export class BaseEntityViewModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}