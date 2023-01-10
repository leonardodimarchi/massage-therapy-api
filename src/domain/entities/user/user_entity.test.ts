import { TestDateUtils } from 'test/utils/test_date_utils';
import { UserEntity } from './user_entity';
import { UserEmail } from './value-objects/email/user_email';
import { UserName } from './value-objects/name/user_name';

describe('UserEntity', () => {
    beforeAll(() => {
        TestDateUtils.setTestDate(new Date());
    });

    afterAll(() => {
        TestDateUtils.resetTestDate();
    });

    it('should be able to instantiate the entity', () => {
        const entity = new UserEntity({
            email: new UserEmail('valid@email.com'),
            name: new UserName('Mocked Name'),
            birthDate: new Date(11, 10, 2000),
            phone: 'Mocked phone',
            password: '123456',
        })

        expect(entity).toBeDefined();
    });
});