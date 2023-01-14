import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserBirthdate } from "@/domain/entities/user/value-objects/birthdate/user_birthdate";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
import { UserName } from "@/domain/entities/user/value-objects/name/user_name";
import { UserPassword } from "@/domain/entities/user/value-objects/password/user_password";
import { UserPhone } from "@/domain/entities/user/value-objects/phone/user_phone";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase, RegisterUseCaseInput } from "@/domain/usecases/user/register_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { makeUser } from "test/factories/user_factory";
import { InMemoryUserRepository } from "test/repositories/in_memory_user_repository";

describe('RegisterUsecase', () => {
    let repository: InMemoryUserRepository;
    let encryptationService: MockProxy<PasswordEncryptionService>;
    let usecase: RegisterUsecase;

    const encryptedPassword = 'hashpassword';

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        encryptationService = mock<PasswordEncryptionService>();
        usecase = new RegisterUsecase(repository, encryptationService);

        encryptationService.hash.mockResolvedValueOnce(encryptedPassword);
    });

    const entity = makeUser({
        override: {
            email: new UserEmail('valid@email.com'),
            name: new UserName('Mocked name'),
            birthDate: new UserBirthdate(new Date(11, 10, 2000)),
            phone: new UserPhone('15992280628'),
            password: new UserPassword('123456'),
        },
    });

    const input: RegisterUseCaseInput = {
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(11, 10, 2000),
        password: '123456',
    };

    it('should register the new user', async () => {
        

        const { createdUser } = await usecase.call(input);

        expect(repository.users[0].email.value).toEqual(input.email);
        expect(repository.users[0].name.value).toEqual(input.name);
        expect(repository.users[0].phone.value).toEqual(input.phone);
        expect(repository.users[0].birthDate.value).toEqual(input.birthDate);
        expect(repository.users[0].password.value).toEqual(encryptedPassword);
        expect(repository.users[0]).toEqual(createdUser);
    })

    it('should get an user when calling the repository successfully', async () => {
        const { createdUser } = await usecase.call(input);

        expect(createdUser).toEqual(expect.any(UserEntity));
    });

    it('should call bcrypt service to hash the user password', async () => {
        await usecase.call(input);

        expect(encryptationService.hash).toHaveBeenNthCalledWith(1, input.password);
    });

    it('should not register if the email already exists', async () => {
        repository.register(entity);

        const usecaseCall = async () => await usecase.call(input);

        expect(usecaseCall()).rejects.toThrow(ValidationException);
    });
});