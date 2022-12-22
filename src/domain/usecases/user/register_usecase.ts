import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserPayload } from "@/domain/models/payloads/user_payload";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
import { UserValidator } from "@/domain/validators/user_validator";


export class RegisterUsecase implements UseCase<UserPayload, UserProxy> {

    constructor(
        private readonly repository: UserRepository,
        private readonly bcryptService: PasswordEncryptionService,
    ) {}

    public async call(params: UserPayload): Promise<UserProxy> {
        if (!UserValidator.isValidEmail(params.email))
            throw new ValidationException('Email inválido');

        if (!UserValidator.isValidName(params.name))
            throw new ValidationException('Nome inválido');

        if (!UserValidator.isValidPhone(params.phone))
            throw new ValidationException('Telefone inválido');

        if (!UserValidator.isValidBirthDate(params.birthDate))
            throw new ValidationException('Data de nascimento inválida');

        if (!UserValidator.isValidPassword(params.password))
            throw new ValidationException('Senha inválida');

        params.password = await this.bcryptService.hash(params.password);

        const entity = await this.repository.register(params);

        return new UserProxy({...entity});
    }
}