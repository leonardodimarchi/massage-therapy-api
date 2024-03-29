import { PasswordEncryptionService } from "../../contracts/services/password_encryptation_service";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../entities/user/user_entity";

export interface ValidateToLoginUsecaseInput {
    email: string;
    password: string;
}

export interface ValidateToLoginUsecaseOutput {
    user: UserEntity | null,
}

export class ValidateToLoginUsecase implements UseCase<ValidateToLoginUsecaseInput, ValidateToLoginUsecaseOutput> {

    constructor(
        private readonly repository: UserRepository,
        private readonly bcryptService: PasswordEncryptionService,
    ) { }

    public async call({
        email,
        password,
    }: ValidateToLoginUsecaseInput): Promise<ValidateToLoginUsecaseOutput> {
        const user = await this.repository.getByEmail(email);

        if (!user) {
            return {
                user: null,
            };
        }

        const isCorrectPassword = await this.bcryptService.compare(password, user.password.value);

        if (!isCorrectPassword) {
            return {
                user: null,
            };
        }
            
        return {
            user,
        };
    }
}