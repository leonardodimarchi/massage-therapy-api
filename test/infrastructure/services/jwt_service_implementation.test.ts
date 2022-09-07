import { JwtService } from "@nestjs/jwt";
import { mock, MockProxy } from "jest-mock-extended";
import { JwtServiceImplementation } from "../../../src/infrastructure/services/jwt_service_implementation";

describe('JwtService', () => {
    let externalService: MockProxy<JwtService>;
    let service: JwtServiceImplementation;

    beforeEach(() => {
        externalService = mock<JwtService>();
        service = new JwtServiceImplementation(externalService);
    });

    it('should call nestjs jwt service', () => {
        service.sign({});

        expect(externalService.sign).toHaveBeenCalledTimes(1);
    });
});