import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserEmail } from "@/domain/entities/user/value-objects/user_email";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserValidator } from "@/domain/validators/user_validator";

export interface RegisterUseCaseInput {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;
}

export interface RegisterUseCaseOutput {
    createdUser: UserEntity,
}

export class RegisterUsecase implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput> {

    constructor(
        private readonly repository: UserRepository,
        private readonly bcryptService: PasswordEncryptionService,
    ) {}

    public async call({
        email,
        name,
        phone,
        birthDate,
        password,
    }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
        if (!UserValidator.isValidName(name))
            throw new ValidationException('Nome inválido');

        if (!UserValidator.isValidPhone(phone))
            throw new ValidationException('Telefone inválido');

        if (!UserValidator.isValidBirthDate(birthDate))
            throw new ValidationException('Data de nascimento inválida');

        if (!UserValidator.isValidPassword(password))
            throw new ValidationException('Senha inválida');

        const hasUserWithEmail = await this.repository.getByEmail(email);

        if (hasUserWithEmail) 
            throw new ValidationException('Email já cadastrado');

        password = await this.bcryptService.hash(password);

        const userToCreate = new UserEntity({
            email: new UserEmail(email),
            name,
            phone,
            birthDate,
            password,
        });
        const createdUser = await this.repository.register(userToCreate);

        return {
            createdUser,
        };
    }
}