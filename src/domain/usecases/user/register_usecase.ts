import { UserEntity } from "../../entities/user_entity";
import { ValidationException } from "../../exceptions/validation_exception";
import { UserRegisterPayload, UserRepository } from "../../contracts/repositories/user_repository";

export class RegisterUsecase implements UseCase<UserEntity, UserRegisterPayload> {

    constructor(private readonly repository: UserRepository) {}

    public async call(params: UserRegisterPayload): Promise<UserEntity> {
        if (!params.isValidEmail())
            throw new ValidationException('Email inválido');

        if (!params.isValidName())
            throw new ValidationException('Nome inválido');

        if (!params.isValidPhone())
            throw new ValidationException('Telefone inválido');

        if (!params.isValidBirthDate())
            throw new ValidationException('Data de nascimento inválida');

        if (!params.isValidPassword())
            throw new ValidationException('Senha inválida');

        return this.repository.register(params);
    }
}