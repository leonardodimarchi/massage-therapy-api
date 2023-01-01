import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { UserEntity } from "@/domain/entities/user_entity";

export class InMemoryUserRepository implements UserRepository {
    
    public users: UserEntity[] = [];

    public async register(user: UserEntity): Promise<UserEntity> {
        this.users.push(user);

        return user;
    }

    public async getByEmail(email: string): Promise<UserEntity | null> {
        const user = this.users.find(u => u.email === email);

        if (!user)
            return null;

        return user;
    }
}