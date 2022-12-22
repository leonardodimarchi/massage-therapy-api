import { MockProxy, mock } from "jest-mock-extended";
import { UserPayload } from "@/domain/models/payloads/user_payload";
import { UserEntity } from "@/domain/entities/user_entity";
import { Repository } from "typeorm";
import { TypeormUserRepository } from "./typeorm_user_repository";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('TypeormUserRepository', () => {
    let typeOrmRepository: MockProxy<Repository<UserEntity>>;
    let repository: TypeormUserRepository;

    beforeEach(() => {
        typeOrmRepository = mock<Repository<UserEntity>>();
        repository = new TypeormUserRepository(typeOrmRepository);
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