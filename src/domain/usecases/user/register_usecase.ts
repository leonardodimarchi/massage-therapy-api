import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserBirthdate } from "@/domain/entities/user/value-objects/birthdate/user_birthdate";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
import { UserName } from "@/domain/entities/user/value-objects/name/user_name";
import { UserPassword } from "@/domain/entities/user/value-objects/password/user_password";
import { UserPhone } from "@/domain/entities/user/value-objects/phone/user_phone";
import { ValidationException } from "@/domain/exceptions/validation_exception";

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
        const userToCreate = new UserEntity({
            email: new UserEmail(email),
            name: new UserName(name),
            phone: new UserPhone(phone),
            birthDate: new UserBirthdate(birthDate),
            password: new UserPassword(password),
        });

        const hasUserWithEmail = await this.repository.getByEmail(email);

        if (hasUserWithEmail) 
            throw new ValidationException('Email já cadastrado');
        
        userToCreate.password = new UserPassword(await this.bcryptService.hash(password));

        const createdUser = await this.repository.register(userToCreate);

        return {
            createdUser,
        };
    }
}