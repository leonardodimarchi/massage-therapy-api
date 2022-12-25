import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { ValidateToLoginUsecase, ValidateToLoginUsecaseInput, ValidateToLoginUsecaseOutput } from "@/domain/usecases/user/validate_to_login_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('ValidateToLoginUsecase', () => {
    let repository: MockProxy<UserRepository>;
    let encryptationService: MockProxy<PasswordEncryptionService>;
    let usecase: ValidateToLoginUsecase;

    beforeEach(() => {
        repository = mock<UserRepository>();
        encryptationService = mock<PasswordEncryptionService>();
        usecase = new ValidateToLoginUsecase(repository, encryptationService);
    });

    const entity = mockedUserEntity;

    const input: ValidateToLoginUsecaseInput = {
        email: 'valid@email.com',
        password: '123456',
    };

    const expectedResult: ValidateToLoginUsecaseOutput = {
        user: entity,
    }

    it('should return the user if the repository returns and the password is correct', async () => {
        repository.getByEmail.mockResolvedValueOnce(entity);
        encryptationService.compare.mockResolvedValueOnce(true);

        const result = await usecase.call(input);

        expect(encryptationService.compare).toHaveBeenNthCalledWith(1, input.password, entity.password);
        expect(repository.getByEmail).toHaveBeenNthCalledWith(1, input.email);
        expect(result).toEqual(expectedResult);
    });

    it('should return null if the repository don\'t find a user with the given email', async () => {
        repository.getByEmail.mockResolvedValueOnce(null);

        const result = await usecase.call(input);

        expect(encryptationService.compare).not.toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

    it('should return null if the given password is incorrect', async () => {
        repository.getByEmail.mockResolvedValueOnce(entity);
        encryptationService.compare.mockResolvedValue(false);

        const result = await usecase.call(input);

        expect(result).toBeNull();
    });
});