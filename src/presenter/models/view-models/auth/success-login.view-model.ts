import { ApiProperty } from "@nestjs/swagger";
import { UserViewModel } from "../user/user.view-model";
import { JwtViewModel } from "./jwt.view-model";

export class SuccessLoginViewModel {
    @ApiProperty()
    jwt: JwtViewModel;

    @ApiProperty()
    user: UserViewModel;
}