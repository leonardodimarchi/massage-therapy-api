import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase, RegisterUseCaseInput, RegisterUseCaseOutput } from "@/domain/usecases/user/register_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('RegisterUsecase', () => {
    let repository: MockProxy<UserRepository>;
    let encryptationService: MockProxy<PasswordEncryptionService>;
    let usecase: RegisterUsecase;

    beforeEach(() => {
        repository = mock<UserRepository>();
        encryptationService = mock<PasswordEncryptionService>();
        usecase = new RegisterUsecase(repository, encryptationService);

        encryptationService.hash.mockResolvedValueOnce(hashPassword);
    });

    const hashPassword = 'hashPassword';

    const entity = new UserEntity({
        ...mockedUserEntity,
        password: hashPassword,
    });

    const input: RegisterUseCaseInput = {
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(),
        password: hashPassword,
    };

    const expectedResult: RegisterUseCaseOutput = {
        createdUser: entity,
    }

    it('should get a user when calling the repository successfully', async () => {
        repository.register.mockResolvedValue(entity);

        const result = await usecase.call(input);

        expect(result).toEqual(expectedResult);
        expect(repository.register).toHaveBeenCalledTimes(1);
    });

    it('should call bcrypt service to hash the user password', async () => {
        await usecase.call(input);

        expect(encryptationService.hash).toHaveBeenNthCalledWith(1, input.password);
    });

    it('should not call register with invalid email', async () => {
        const usecaseCall = async () => {
            await usecase.call({
                ...input,
                email: 'invalid_email',
            });
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid name', async () => {
        const usecaseCall = async () => {
            await usecase.call({
                ...input,
                name: '',
            });
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid phone', async () => {
        const usecaseCall = async () => {
            await usecase.call({
                ...input,
                phone: '',
            });
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid birthdate', async () => {
        const usecaseCall = async () => {
            await usecase.call({
                ...input,
                birthDate: null,
            });
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid password', async () => {
        const usecaseCall = async () => {
            await usecase.call({
                ...input,
                password: '',
            });
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register if the email already exists', async () => {
        repository.getByEmail.mockResolvedValueOnce(mockedUserEntity);
        const usecaseCall = async () => await usecase.call(input);        

        expect(usecaseCall()).rejects.toThrow(ValidationException);
    });
});