import { UserEntity } from "../../src/domain/entities/user_entity";

export const mockedUserEntity = new UserEntity({
    email: 'Mocked email',
    name: 'Mocked Name',
    birthDate: new Date(),
    phone: 'Mocked phone'
});