import { BcryptServiceImplementation } from "../../../src/infrastructure/services/bcrypt_service_implementation";
import { BcryptService } from "../../../src/domain/contracts/adapters/bcrypt_service";

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