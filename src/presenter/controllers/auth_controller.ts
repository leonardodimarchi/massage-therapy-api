import { UserEntity } from "@/domain/entities/user_entity";
import { JwtProxy } from "@/domain/models/proxies/jwt_proxy";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { LocalAuthGuard } from "@/infra/guards/authentication/local_auth_guard";
import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUsecase: LoginUsecase,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req: { user: UserEntity }): JwtProxy {
      return this.loginUsecase.call(req.user);
    }
}