import { PasswordEncryptionService } from "../../contracts/services/password_encryptation_service";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../entities/user_entity";
import { LoginPayload } from "../../../domain/models/payloads/login_payload";

export class ValidateToLoginUsecase implements UseCase<LoginPayload, UserEntity> {

    constructor(
        private readonly repository: UserRepository,
        private readonly bcryptService: PasswordEncryptionService,
    ) { }

    public async call(params: LoginPayload): Promise<UserEntity> {
        const user = await this.repository.getByEmail(params.email);

        if (!user)
            return null;

        const isCorrectPassword = await this.bcryptService.compare(params.password, user.password);

        if (!isCorrectPassword)
            return null;

        return user;
    }
}