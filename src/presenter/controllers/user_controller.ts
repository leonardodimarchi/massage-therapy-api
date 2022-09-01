import { Body, Controller, Post } from "@nestjs/common";
import { UserRegisterPayload, UserRepository } from "../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../domain/entities/user_entity";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";

@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) {}

    @Post()
    public async register(@Body() userPayload: UserRegisterPayload): Promise<UserEntity> {
        return await this.registerUsecase.call(new UserRegisterPayload(userPayload));
    }
}