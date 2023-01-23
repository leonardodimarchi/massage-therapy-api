import { AddressRepository } from "@/domain/contracts/repositories/address_repository";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { AddressEntity } from "@/domain/entities/address/address_entity";
import { City } from "@/domain/entities/address/value-objects/city/city";
import { Neighborhood } from "@/domain/entities/address/value-objects/neighborhood/neighborhood";
import { PostalCode } from "@/domain/entities/address/value-objects/postal-code/postal_code";
import { State } from "@/domain/entities/address/value-objects/state/state";
import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";
import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserBirthdate } from "@/domain/entities/user/value-objects/birthdate/user_birthdate";
import { UserDiseaseHistory } from "@/domain/entities/user/value-objects/disease-history/disease_history";
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
    gender: UserGenderEnum;
    diseaseHistory?: string;

    state: string;
    city: string;
    postalCode: string;
    neighborhood: string;
    houseNumber: number;
}

export interface RegisterUseCaseOutput {
    createdUser: UserEntity,
}

export class RegisterUsecase implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput> {

    constructor(
        private readonly repository: UserRepository,
        private readonly addressRepository: AddressRepository,
        private readonly bcryptService: PasswordEncryptionService,
    ) { }

    public async call({
        email,
        name,
        phone,
        birthDate,
        password,
        gender,
        diseaseHistory,
        state,
        city,
        postalCode,
        neighborhood,
        houseNumber,
    }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
        const userToCreate = new UserEntity({
            email: new UserEmail(email),
            name: new UserName(name),
            phone: new UserPhone(phone),
            birthDate: new UserBirthdate(birthDate),
            password: new UserPassword(password),
            gender,
            ...diseaseHistory && { diseaseHistory: new UserDiseaseHistory(diseaseHistory) },
        });

        const hasUserWithEmail = await this.repository.getByEmail(email);

        if (hasUserWithEmail)
            throw new ValidationException('Email já cadastrado');

        userToCreate.password = new UserPassword(await this.bcryptService.hash(password));

        const createdUser = await this.repository.register(userToCreate);

        const address = new AddressEntity({
            postalCode: new PostalCode(postalCode),
            state: new State(state),
            city: new City(city),
            neighborhood: new Neighborhood(neighborhood),
            userId: createdUser.id,
            houseNumber,
        });

        await this.addressRepository.create(address);

        return {
            createdUser,
        };
    }
}