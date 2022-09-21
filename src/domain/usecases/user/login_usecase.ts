import { JwtProxy } from "../../../domain/models/proxies/jwt_proxy";
import { JwtService } from "../../../domain/contracts/services/jwt_service";
import { UserEntity } from "../../../domain/entities/user_entity";
import { JwtPayload } from "../../../domain/models/payloads/jwt_payload";

export class LoginUsecase implements UseCase<UserEntity, JwtProxy> {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public call(params: UserEntity): JwtProxy {
        const jwtPayload: JwtPayload = {
            email: params.email,
            sub: params.id,
        };

        return new JwtProxy({
            access_token: this.jwtService.sign(jwtPayload),
        })
    }
}