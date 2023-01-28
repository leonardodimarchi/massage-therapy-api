import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { UserEntity } from "@/domain/entities/user/user_entity";

export class InMemoryUserRepository implements UserRepository {
    
    public users: UserEntity[] = [];

    public shouldThrowErrorAt: 'none' | keyof UserRepository = 'none';

    public async register(user: UserEntity): Promise<UserEntity> {
        if (this.shouldThrowErrorAt === 'register')
            throw new Error('Mocked register error.');

        this.users.push(user);

        return user;
    }

    public async getByEmail(email: string): Promise<UserEntity | null> {
        if (this.shouldThrowErrorAt === 'getByEmail')
            throw new Error('Mocked getByEmail error.');

        const user = this.users.find(u => u.email.value === email);

        if (!user)
            return null;

        return user;
    }
}