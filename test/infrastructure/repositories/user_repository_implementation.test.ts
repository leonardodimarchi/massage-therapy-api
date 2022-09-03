import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "../../mocks/user_entity.mock";
import { UserDatasource } from "../../../src/infrastructure/contracts/datasources/user_datasource";
import { UserRepositoryImplementation } from "../../../src/infrastructure/repositories/user_repository_implementation";
import { UserRepository } from "../../../src/domain/contracts/repositories/user_repository";
import { UserPayload } from "../../../src/domain/models/payloads/user_payload";

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
});