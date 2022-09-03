import { UserEntity } from "../../src/domain/entities/user_entity";

export const mockedUserEntity = new UserEntity({
    id: 1,
    createdAt: new Date(11, 10, 2000),
    updatedAt: new Date(11, 10, 2000),
    email: 'Mocked email',
    name: 'Mocked Name',
    birthDate: new Date(11, 10, 2000),
    phone: 'Mocked phone',
    password: '123456'
});