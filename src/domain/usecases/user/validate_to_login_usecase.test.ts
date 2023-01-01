import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { ValidateToLoginUsecase } from "@/domain/usecases/user/validate_to_login_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { makeUser } from "test/factories/user_factory";
import { InMemoryUserRepository } from "test/repositories/in_memory_user_repository";

describe('ValidateToLoginUsecase', () => {
    let repository: InMemoryUserRepository;
    let encryptationService: MockProxy<PasswordEncryptionService>;
    let usecase: ValidateToLoginUsecase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        encryptationService = mock<PasswordEncryptionService>();
        usecase = new ValidateToLoginUsecase(repository, encryptationService);
    });

    it('should return the user if the repository returns and the password is correct', async () => {
        const email = 'valid@email.com';
        const password = '123456';

        const createdUser = makeUser({
            override: {
                email,
                password,
            }
        });

        repository.register(createdUser);
        encryptationService.compare.mockResolvedValueOnce(true);

        const { user } = await usecase.call({ email, password });

        expect(user).toEqual(createdUser);
    });

    it('should return null if the repository don\'t find a user with the given email', async () => {
        const { user } = await usecase.call({ 
            email: 'valid@email.com',
            password: '123456',
        });

        expect(user).toBeNull();
    });

    it('should return null if the given password is incorrect', async () => {
        const email = 'valid@email.com';
        const password = '123456';

        const createdUser = makeUser({
            override: {
                email,
                password,
            }
        });

        repository.register(createdUser);
        encryptationService.compare.mockResolvedValue(false);

        const { user } = await usecase.call({ email, password});

        expect(user).toBeNull();
    });
});