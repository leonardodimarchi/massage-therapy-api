import { BcryptPasswordEncryptionService } from "./bcrypt_password_encryptation_service";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";

describe('BcryptService', () => {
    let service: PasswordEncryptionService;

    beforeEach(() => {
        service = new BcryptPasswordEncryptionService();
    });

    it('should hash a password correctly', async () => {
        const passwordHashed = await service.hash('password');

        expect(await service.compare('password', passwordHashed)).toBe(true);
    });
});