import { UserEntity } from "../entities/user_entity";
import { ValidationException } from "../exceptions/validation_exception";
import { UserRegisterParams, UserRepository } from "../repositories/user_repository";
import { Validators } from "../shared/validations/validators";

export class RegisterUsecase implements UseCase<UserEntity, UserRegisterParams> {

    constructor(private readonly repository: UserRepository) {}

    public async call(params: UserRegisterParams): Promise<UserEntity> {
        if (!Validators.isValidEmail(params.email))
            throw new ValidationException();

        return this.repository.register(params);
    }
}