import { UserEntity, UserProps } from "@/domain/entities/user/user_entity";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
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
        name: 'Mocked Name',
        birthDate: new Date(11, 10, 2000),
        phone: 'Mocked phone',
        password: '123456',
        ...override,
    }, {
        id: 1,
        createdAt: new Date(11, 10, 2000),
        updatedAt: new Date(11, 10, 2000),
        ...entityPropsOverride,
    })
};