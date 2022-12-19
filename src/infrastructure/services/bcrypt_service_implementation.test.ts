import { BcryptServiceImplementation } from "./bcrypt_service_implementation";
import { BcryptService } from "@/domain/contracts/services/bcrypt_service";

describe('BcryptService', () => {
    let service: BcryptService;

    beforeEach(() => {
        service = new BcryptServiceImplementation();
    });

    it('should hash a password correctly', async () => {
        const passwordHashed = await service.hash('password');

        expect(await service.compare('password', passwordHashed)).toBe(true);
    });
});