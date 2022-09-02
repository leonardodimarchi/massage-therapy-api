import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ValidationException } from "../../domain/exceptions/validation_exception";
import { UserRegisterPayload } from "../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../domain/entities/user_entity";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";

@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) {}

    @Post()
    public async register(@Body() userPayload: UserRegisterPayload): Promise<UserEntity> {
        try {
            return await this.registerUsecase.call(new UserRegisterPayload(userPayload));
        } catch (error) {
            if (error instanceof ValidationException) 
                throw new HttpException(
                    error.message,
                    HttpStatus.BAD_REQUEST,
                );
            
            throw error;
        }
    }
}