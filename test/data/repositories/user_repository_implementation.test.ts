import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "../../../test/mocks/user_entity.mock";
import { UserDatasource } from "../../../src/data/contracts/datasources/user_datasource";
import { UserRepositoryImplementation } from "../../../src/data/repositories/user_repository_implementation";
import { UserRegisterPayload, UserRepository } from "../../../src/domain/contracts/repositories/user_repository";

describe('UserRepository', () => {
    let repository: UserRepository;
    let datasource: MockProxy<UserDatasource>

    beforeEach(() => {
        datasource = mock<UserDatasource>();
        repository = new UserRepositoryImplementation(datasource);
    });

    describe('Register', () => {
        const mockedReturn = mockedUserEntity;
        const payload = new UserRegisterPayload({
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