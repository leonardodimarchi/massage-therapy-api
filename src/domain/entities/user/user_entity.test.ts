import { TestDateUtils } from 'test/utils/test_date_utils';
import { UserGenderEnum } from './enum/user_gender.enum';
import { UserEntity } from './user_entity';
import { UserBirthdate } from './value-objects/birthdate/user_birthdate';
import { UserEmail } from './value-objects/email/user_email';
import { UserName } from './value-objects/name/user_name';
import { UserPassword } from './value-objects/password/user_password';
import { UserPhone } from './value-objects/phone/user_phone';

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
            birthDate: new UserBirthdate(new Date(11, 10, 2000)),
            phone: new UserPhone('15998489760'),
            password: new UserPassword('123456'),
            gender: UserGenderEnum.MALE,
        })

        expect(entity).toBeDefined();
    });
});