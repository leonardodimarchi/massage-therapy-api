import { MockProxy, mock } from "jest-mock-extended";
import { UserEntity } from "@/domain/entities/user_entity";
import { Repository } from "typeorm";
import { TypeOrmUserRepository } from "./typeorm_user_repository";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('TypeOrmUserRepository', () => {
    let typeOrmRepository: MockProxy<Repository<UserEntity>>;
    let repository: TypeOrmUserRepository;

    beforeEach(() => {
        typeOrmRepository = mock<Repository<UserEntity>>();
        repository = new TypeOrmUserRepository(typeOrmRepository);
    });

    describe('Register', () => {
        const entity = mockedUserEntity;
        const payload = {
            email: 'valid@email.com',
            name: 'Mocked name',
            phone: '15992280628',
            birthDate: new Date(),
            password: '123456',
        };

        it('should create the entity at the database', async () => {
            typeOrmRepository.save.mockResolvedValue(entity);

            const result = await repository.register(payload);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.save).toHaveBeenNthCalledWith(1, payload);
        });
    });

    describe('GetByEmail', () => {
        const entity = mockedUserEntity;
        const mockedEmail = 'my@email.com';

        it('should get a user from the database', async () => {
            typeOrmRepository.findOne.mockResolvedValue(entity);

            const result = await repository.getByEmail(mockedEmail);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.findOne).toHaveBeenNthCalledWith(1, {
                where: {
                    email: mockedEmail
                }
            });
        });
    });
});