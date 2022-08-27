import { Entity } from "../shared/entity";

export class UserEntity implements Entity {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
}