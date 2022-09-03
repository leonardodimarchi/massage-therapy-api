import { UserValidator } from "../../../domain/validators/user_validator";
import { UserRepository } from "../../../domain/contracts/repositories/user_repository";
import { UserPayload } from "../../../domain/models/payloads/user_payload";
import { UserEntity } from "../../entities/user_entity";
import { ValidationException } from "../../exceptions/validation_exception";

export class RegisterUsecase implements UseCase<UserEntity, UserPayload> {

    constructor(private readonly repository: UserRepository) {}

    public async call(params: UserPayload): Promise<UserEntity> {
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

        return this.repository.register(params);
    }
}