import { ApiProperty } from "@nestjs/swagger";

export class BaseOutputDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}