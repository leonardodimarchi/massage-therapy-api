import { MockProxy, mock } from "jest-mock-extended";
import { UserRegisterPayload } from "../../../src/domain/contracts/repositories/user_repository";
import { UserEntity } from "../../../src/domain/entities/user_entity";
import { UserDatasourceImplementation } from "../../../src/infrastructure/datasources/user_datasource_implementation";
import { mockedUserEntity } from "../../../test/mocks/user_entity.mock";
import { Repository } from "typeorm";

describe('UserDatasource', () => {
    let typeOrmRepository: MockProxy<Repository<UserEntity>>;
    let datasource: UserDatasourceImplementation

    beforeEach(() => {
        typeOrmRepository = mock<Repository<UserEntity>>();
        datasource = new UserDatasourceImplementation(typeOrmRepository);
    });

    describe('Register', () => {
        const entity = mockedUserEntity;
        const payload = new UserRegisterPayload({
            email: 'valid@email.com',
            name: 'Mocked name',
            phone: '15992280628',
            birthDate: new Date(),
            password: '123456'
        });

        it('should create the entity at the database', async () => {
            typeOrmRepository.save.mockResolvedValue(entity);

            const result = await datasource.register(payload);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.save).toHaveBeenNthCalledWith(1, payload);
        });
    })
});