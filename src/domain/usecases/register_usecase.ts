import { UserEntity } from "../entities/user_entity";
import { ValidationException } from "../exceptions/validation_exception";
import { UserRegisterParams, UserRepository } from "../repositories/user_repository";

export class RegisterUsecase implements UseCase<UserEntity, UserRegisterParams> {

    constructor(private readonly repository: UserRepository) {}

    public async call(params: UserRegisterParams): Promise<UserEntity> {
        if (!params.isValidEmail())
            throw new ValidationException('Email inválido');

        if (!params.isValidName())
            throw new ValidationException('Nome inválido');

        if (!params.isValidPhone())
            throw new ValidationException('Telefone inválido');

        if (!params.isValidBirthDate())
            throw new ValidationException('Data de nascimento inválida');

        return this.repository.register(params);
    }
}