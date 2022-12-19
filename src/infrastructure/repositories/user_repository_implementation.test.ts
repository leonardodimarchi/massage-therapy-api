import { MockProxy, mock } from "jest-mock-extended";
import { UserDatasource } from "@/infra/contracts/datasources/user_datasource";
import { UserRepositoryImplementation } from "./user_repository_implementation";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { UserPayload } from "@/domain/models/payloads/user_payload";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('UserRepository', () => {
    let repository: UserRepository;
    let datasource: MockProxy<UserDatasource>

    beforeEach(() => {
        datasource = mock<UserDatasource>();
        repository = new UserRepositoryImplementation(datasource);
    });

    describe('Register', () => {
        const mockedReturn = mockedUserEntity;
        const payload = new UserPayload({
            email: 'valid@email.com',
            name: 'Mocked name',
            phone: '15992280628',
            birthDate: new Date(),
            password: '123456'
        });
    

        it('should return a user entity when calling the datasource', async () => {
            datasource.register.mockResolvedValue(mockedReturn);

            const result = await repository.register(payload);

            expect(result).toEqual(mockedReturn);
            expect(datasource.register).toHaveBeenNthCalledWith(1, payload);
        });
    });

    describe('GetByEmail', () => {
        const mockedReturn = mockedUserEntity;
        const mockedEmail = 'my@email.com';

        it('should return a user entity when calling the datasource', async () => {
            datasource.getByEmail.mockResolvedValue(mockedReturn);

            const result = await repository.getByEmail(mockedEmail);

            expect(result).toEqual(mockedReturn);
            expect(datasource.getByEmail).toHaveBeenNthCalledWith(1, mockedEmail);
        });
    });
});