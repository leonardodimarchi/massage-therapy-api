import { JwtProxy } from "../../../domain/models/proxies/jwt_proxy";
import { JwtService } from "../../../domain/contracts/services/jwt_service";
import { UserEntity } from "../../../domain/entities/user_entity";

export class LoginUsecase implements UseCase<JwtProxy, UserEntity> {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public call(params: UserEntity): JwtProxy {
        const jwtPayload = {
            email: params.email,
            sub: params.id,
        };

        return new JwtProxy({
            access_token: this.jwtService.sign(jwtPayload),
        })
    }
}