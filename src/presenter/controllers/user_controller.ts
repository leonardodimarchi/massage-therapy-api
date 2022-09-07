import { Body, Controller, HttpException, Request, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ValidationException } from "../../domain/exceptions/validation_exception";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";
import { UserPayload } from "../../domain/models/payloads/user_payload";
import { UserProxy } from "../../domain/models/proxies/user_proxy";
import { LocalAuthGuard } from "../../infrastructure/authentication/guards/local_auth_guard";
import { UserEntity } from "../../domain/entities/user_entity";
import { LoginUsecase } from "../../domain/usecases/user/login_usecase";
import { JwtProxy } from "../../domain/models/proxies/jwt_proxy";

@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
        private readonly loginUsecase: LoginUsecase,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req: { user: UserEntity }): JwtProxy {
      return this.loginUsecase.call(req.user);
    }

    @Post()
    public async register(@Body() payload: UserPayload): Promise<UserProxy> {
        try {
            const result = await this.registerUsecase.call(payload);

            return new UserProxy({ ...result });
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