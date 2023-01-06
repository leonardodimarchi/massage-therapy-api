import { TestDateUtils } from 'test/utils/test_date_utils';
import { UserEntity } from './user_entity';

describe('UserEntity', () => {
    beforeAll(() => {
        TestDateUtils.setTestDate(new Date());
    });

    afterAll(() => {
        TestDateUtils.resetTestDate();
    });

    it('should be able to instantiate the entity', () => {
        const entity = new UserEntity({
            email: 'Mocked email',
            name: 'Mocked Name',
            birthDate: new Date(11, 10, 2000),
            phone: 'Mocked phone',
            password: '123456',
        })

        expect(entity).toBeDefined();
    });
});