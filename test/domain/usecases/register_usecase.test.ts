import { mockedUserEntity } from "../../../test/mocks/user_entity.mock";
import { UserRepository } from "../../../src/domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../../src/domain/usecases/user/register_usecase";
import { ValidationException } from "../../../src/domain/exceptions/validation_exception";
import { mock, MockProxy } from 'jest-mock-extended';
import { UserPayload } from "../../../src/domain/models/payloads/user_payload";
import { BcryptService } from "../../../src/domain/contracts/services/bcrypt_service";
import { UserEntity } from "../../../src/domain/entities/user_entity";

describe('RegisterUsecase', () => {
    let repository: MockProxy<UserRepository>;
    let bcryptService: MockProxy<BcryptService>;
    let usecase: RegisterUsecase;

    beforeEach(() => {
        repository = mock<UserRepository>();
        bcryptService = mock<BcryptService>();
        usecase = new RegisterUsecase(repository, bcryptService);


        bcryptService.hash.mockResolvedValueOnce(hashPassword);
    });

    const hashPassword = 'hashPassword';

    const params = new UserPayload({
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(),
        password: hashPassword,
    });

    const entity: UserEntity = {
        ...mockedUserEntity,
        password: hashPassword,
    };

    it('should get a user when calling the repository successfully', async () => {
        repository.register.mockResolvedValue(entity);

        const result = await usecase.call(new UserPayload({
            ...params,
        }));

        expect(result).toBe(entity);
        expect(repository.register).toHaveBeenNthCalledWith(1, params);
    });

    it('should call bcrypt service to hash the user password', async () => {
        await usecase.call(new UserPayload({
            ...params,
        }));

        expect(bcryptService.hash).toHaveBeenNthCalledWith(1, params.password);
    });

    it('should not call register with invalid email', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserPayload({
                ...params,
                email: 'invalid_email',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid name', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserPayload({
                ...params,
                name: '',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid phone', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserPayload({
                ...params,
                phone: '',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid birthdate', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserPayload({
                ...params,
                birthDate: null,
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid password', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserPayload({
                ...params,
                password: '',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });
});