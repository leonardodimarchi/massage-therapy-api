import { PasswordEncryptionService } from "../../domain/contracts/services/password_encryptation_service";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptPasswordEncryptionService implements PasswordEncryptionService {
    private readonly rounds: number = 10;

    async hash(hashString: string): Promise<string> {
      return await bcrypt.hash(hashString, this.rounds);
    }
  
    async compare(password: string, hashPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashPassword);
    }
}