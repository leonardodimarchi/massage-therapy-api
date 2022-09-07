import { MockProxy, mock } from "jest-mock-extended";
import { UserPayload } from "../../../src/domain/models/payloads/user_payload";
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
        const payload = new UserPayload({
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
    });

    describe('GetByEmail', () => {
        const entity = mockedUserEntity;
        const mockedEmail = 'my@email.com';

        it('should get a user from the database', async () => {
            typeOrmRepository.findOne.mockResolvedValue(entity);

            const result = await datasource.getByEmail(mockedEmail);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.findOne).toHaveBeenNthCalledWith(1, {
                where: {
                    email: mockedEmail
                }
            });
        });
    });
});