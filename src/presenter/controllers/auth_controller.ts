import { UserEntity } from "@/domain/entities/user_entity";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { LocalAuthGuard } from "@/infra/guards/authentication/local_auth_guard";
import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SuccessLoginDto } from "@/presenter/dto/auth/success-login.dto";
import { LoginDto } from "../dto/auth/login.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUsecase: LoginUsecase,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
      description: 'Os dados para login',
      type: LoginDto,
      required: true,
    })
    @ApiOperation({ summary: 'Gerar um token de usuário (JWT)' })
    @ApiOkResponse({ description: 'O token foi gerado com sucesso', type: SuccessLoginDto })
    public async login(@Request() req: { user: UserEntity }): Promise<SuccessLoginDto> {
      const { jwt, loggedUser } = this.loginUsecase.call(req.user);

      return {
        jwt,
        user: loggedUser
      }
    }
}