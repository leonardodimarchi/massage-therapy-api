import { BcryptService } from "../../domain/contracts/services/bcrypt_service";
import * as bcrypt from 'bcrypt';

export class BcryptServiceImplementation implements BcryptService {
    private readonly rounds: number = 10;

    async hash(hashString: string): Promise<string> {
      return await bcrypt.hash(hashString, this.rounds);
    }
  
    async compare(password: string, hashPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashPassword);
    }
}