import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ValidateToLoginUsecase } from "../../../domain/usecases/user/validate_to_login_usecase";
import { LoginPayload } from "../../../domain/models/payloads/login_payload";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateToLoginUsecase: ValidateToLoginUsecase) {
    super({
        usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateToLoginUsecase.call(new LoginPayload({
        email,
        password,
    }));

    if (!user)
      throw new UnauthorizedException('Usuário não encontrado ou senha incorreta.');

    return user;
  }
}