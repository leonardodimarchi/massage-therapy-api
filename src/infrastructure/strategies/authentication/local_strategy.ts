import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ValidateToLoginUsecase } from "../../../domain/usecases/user/validate_to_login_usecase";
import { UserValidator } from "@/domain/validators/user_validator";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateToLoginUsecase: ValidateToLoginUsecase) {
    super({
        usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const isValidEmail = UserValidator.isValidEmail(email);
    const isValidPassword = UserValidator.isValidPassword(password);

    if (!isValidEmail)
      throw new BadRequestException('Email inválido.');

    if (!isValidPassword)
      throw new BadRequestException('Senha inválida.'); 

    const user = await this.validateToLoginUsecase.call({
        email,
        password,
    });

    if (!user)
      throw new UnauthorizedException('Usuário não encontrado ou senha incorreta.');

    return user;
  }
}