import { ApiProperty } from "@nestjs/swagger";

export class JwtDto {
    @ApiProperty({
        required: true,
    })
    access_token: string;
}