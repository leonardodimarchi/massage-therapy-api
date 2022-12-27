import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ENV_AUTH_CONFIG_KEY } from '@/infra/configurations/authentication.config';

export interface ValidateJwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const config = configService.get<AuthConfig>(ENV_AUTH_CONFIG_KEY);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  public validate(payload: ValidateJwtPayload): { id: number, email: string } {
    return { id: payload.sub, email: payload.email };
  }
}