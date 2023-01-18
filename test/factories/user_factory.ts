import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";
import { UserEntity, UserProps } from "@/domain/entities/user/user_entity";
import { UserBirthdate } from "@/domain/entities/user/value-objects/birthdate/user_birthdate";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
import { UserName } from "@/domain/entities/user/value-objects/name/user_name";
import { UserPassword } from "@/domain/entities/user/value-objects/password/user_password";
import { UserPhone } from "@/domain/entities/user/value-objects/phone/user_phone";
import { EntityProps } from "@/domain/shared/entity";

interface MakeUserOverrideProps {
    override?: Omit<Partial<UserProps>, keyof EntityProps>,
    entityPropsOverride?: Partial<EntityProps>,
}

export function makeUser(overrideProps: MakeUserOverrideProps = {}): UserEntity {
    const override = overrideProps.override ?? {};
    const entityPropsOverride = overrideProps.entityPropsOverride ?? {};

    return new UserEntity({
        email: new UserEmail('valid@email.com'),
        name: new UserName('Mocked Name'),
        birthDate: new UserBirthdate(new Date(11, 10, 2000)),
        phone: new UserPhone('15998489760'),
        password: new UserPassword('123456'),
        gender: UserGenderEnum.MALE,
        ...override,
    }, {
        id: 1,
        createdAt: new Date(11, 10, 2000),
        updatedAt: new Date(11, 10, 2000),
        ...entityPropsOverride,
    })
};