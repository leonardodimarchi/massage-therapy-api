import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserPayload, UserPayloadProps } from "@/domain/models/payloads/user_payload";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) { }

    @Post()
    public async register(@Body() payload: UserPayloadProps): Promise<UserProxy> {
        try {
            return await this.registerUsecase.call(new UserPayload(payload));
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