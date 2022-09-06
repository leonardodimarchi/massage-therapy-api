import { Body, Controller, HttpException, Request, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ValidationException } from "../../domain/exceptions/validation_exception";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";
import { UserPayload } from "../../domain/models/payloads/user_payload";
import { UserProxy } from "../../domain/models/proxies/user_proxy";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
      return req.user;
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