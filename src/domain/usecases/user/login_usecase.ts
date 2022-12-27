import { JwtService } from "../../../domain/contracts/services/jwt_service";
import { UserEntity } from "../../../domain/entities/user_entity";
import { JwtInterface } from "@/domain/models/interfaces/jwt.interface";

export interface LoginUseCaseInput {
    user: UserEntity,
}

export interface LoginUseCaseOutput {
    jwt: JwtInterface,
}

export class LoginUsecase implements UseCase<LoginUseCaseInput, LoginUseCaseOutput> {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public call({ user }: LoginUseCaseInput): LoginUseCaseOutput {
        return {
            jwt: {
                access_token: this.jwtService.sign({
                    email: user.email,
                    sub: user.id,
                }),
            },
        }
    }
}