import { JwtProxy } from "../../../domain/models/proxies/jwt_proxy";
import { JwtService } from "../../../domain/contracts/services/jwt_service";
import { UserEntity } from "../../../domain/entities/user_entity";
import { JwtPayload } from "../../../domain/models/payloads/jwt_payload";
import { UserProxy } from "@/domain/models/proxies/user_proxy";

export interface LoginUseCaseOutput {
    loggedUser: UserProxy,
    jwt: JwtProxy,
}

export class LoginUsecase implements UseCase<UserEntity, LoginUseCaseOutput> {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public call(params: UserEntity): LoginUseCaseOutput {
        const jwtPayload: JwtPayload = {
            email: params.email,
            sub: params.id,
        };

        const jwt = new JwtProxy({
            access_token: this.jwtService.sign(jwtPayload),
        });

        const loggedUser = new UserProxy({
            id: params.id,
            createdAt: params.createdAt,
            updatedAt: params.updatedAt,
            birthDate: params.birthDate,
            email: params.email,
            name: params.name,
            phone: params.phone,
        });

        return {
            jwt,
            loggedUser,
        }
    }
}