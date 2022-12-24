import { ApiProperty } from "@nestjs/swagger";

export class JwtViewModel {
    @ApiProperty()
    access_token: string;
}