import { UserEntity } from "@/domain/entities/user_entity";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { LocalAuthGuard } from "@/infra/guards/authentication/local_auth_guard";
import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginPayload } from "../models/payloads/auth/login.payload";
import { SuccessLoginViewModel } from "../models/view-models/auth/success-login.view-model";
import { UserViewModelMapper } from "../models/view-models/user/user.view-model.mapper";

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
      type: LoginPayload,
      required: true,
    })
    @ApiOperation({ summary: 'Gerar um token de usuário (JWT)' })
    @ApiOkResponse({ description: 'O token foi gerado com sucesso', type: SuccessLoginViewModel })
    public async login(@Request() { user }: { user: UserEntity }): Promise<SuccessLoginViewModel> {
      const { jwt } = this.loginUsecase.call({
        user,
      });

      return {
        jwt,
        user: UserViewModelMapper.toModel(user),
      }
    }
}