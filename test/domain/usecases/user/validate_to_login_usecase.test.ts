import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { BcryptService } from "@/domain/contracts/services/bcrypt_service";
import { UserEntity } from "@/domain/entities/user_entity";
import { LoginPayload } from "@/domain/models/payloads/login_payload";
import { ValidateToLoginUsecase } from "@/domain/usecases/user/validate_to_login_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('ValidateToLoginUsecase', () => {
    let repository: MockProxy<UserRepository>;
    let bcryptService: MockProxy<BcryptService>;
    let usecase: ValidateToLoginUsecase;

    beforeEach(() => {
        repository = mock<UserRepository>();
        bcryptService = mock<BcryptService>();
        usecase = new ValidateToLoginUsecase(repository, bcryptService);
    });

    const params = new LoginPayload({
        email: 'valid@email.com',
        password: '123456',
    });

    const entity: UserEntity = {
        ...mockedUserEntity,
    };

    it('should return the user if the repository returns and the password is correct', async () => {
        repository.getByEmail.mockResolvedValueOnce(entity);
        bcryptService.compare.mockResolvedValueOnce(true);

        const result = await usecase.call(params);

        expect(bcryptService.compare).toHaveBeenNthCalledWith(1, params.password, entity.password);
        expect(repository.getByEmail).toHaveBeenNthCalledWith(1, params.email);
        expect(result).toEqual(entity);
    });

    it('should return null if the repository don\'t find a user with the given email', async () => {
        repository.getByEmail.mockResolvedValueOnce(null);

        const result = await usecase.call(params);

        expect(bcryptService.compare).not.toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

    it('should return null if the given password is incorrect', async () => {
        repository.getByEmail.mockResolvedValueOnce(entity);
        bcryptService.compare.mockResolvedValue(false);

        const result = await usecase.call(params);

        expect(result).toBeNull();
    });
});