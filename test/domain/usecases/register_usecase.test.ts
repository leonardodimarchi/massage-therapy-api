import { mockedUserEntity } from "../../../test/mocks/user_entity.mock";
import { UserRepository } from "../../../src/domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../../src/domain/usecases/user/register_usecase";
import { ValidationException } from "../../../src/domain/exceptions/validation_exception";
import { mock, MockProxy } from 'jest-mock-extended';
import { UserPayload } from "../../../src/domain/models/payloads/user_payload";

describe('RegisterUsecase', () => {
    let usecase: RegisterUsecase;
    let repository: MockProxy<UserRepository>;

    beforeEach(() => {
        repository = mock<UserRepository>();
        usecase = new RegisterUsecase(repository);
    });

    const params = new UserPayload({
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(),
        password: '123456'
    });

    const entity = mockedUserEntity;

    it('should get a user when calling the repository successfully', async () => {
        repository.register.mockResolvedValue(entity);

        const result = await usecase.call(params);

        expect(result).toBe(entity);
        expect(repository.register).toHaveBeenCalledWith(params);
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