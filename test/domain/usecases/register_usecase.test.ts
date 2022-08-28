import { mockedUserEntity } from "../../../test/mocks/user_entity.mock";
import { UserRegisterParams, UserRepository } from "../../../src/domain/repositories/user_repository";
import { RegisterUsecase } from "../../../src/domain/usecases/register_usecase";
import { ValidationException } from "../../../src/domain/exceptions/validation_exception";
import { mock, MockProxy } from 'jest-mock-extended';


describe('RegisterUsecase', () => {
    let usecase: RegisterUsecase;
    let repository: MockProxy<UserRepository>;

    beforeEach(() => {
        repository = mock<UserRepository>();
        usecase = new RegisterUsecase(repository);
    });

    const params = new UserRegisterParams({
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(),
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
            await usecase.call(new UserRegisterParams({
                ...params,
                email: 'invalid_email',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid name', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserRegisterParams({
                ...params,
                name: '',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid phone', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserRegisterParams({
                ...params,
                phone: '',
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });

    it('should not call register with invalid birthdate', async () => {
        const usecaseCall = async () => {
            await usecase.call(new UserRegisterParams({
                ...params,
                birthDate: null,
            }));
        }

        expect(usecaseCall()).rejects.toThrow(ValidationException);
        expect(repository.register).not.toHaveBeenCalled();
    });
});