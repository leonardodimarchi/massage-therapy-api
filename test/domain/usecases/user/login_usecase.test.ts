import { JwtProxy } from "@/domain/models/proxies/jwt_proxy";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { JwtService } from "@nestjs/jwt";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('LoginUsecase', () => {
    let jwtService: MockProxy<JwtService>;
    let usecase: LoginUsecase;

    beforeEach(() => {
        jwtService = mock<JwtService>();
        usecase = new LoginUsecase(jwtService);
    });

    const mockedEntity = mockedUserEntity;

    const accessToken = 'mocked access_token';

    const jwtProxy = new JwtProxy({
        access_token: accessToken,
    })

    it('should return a JwtProxy with the correct access_token', () => {
        jwtService.sign.mockReturnValueOnce(accessToken);

        const result = usecase.call(mockedEntity);

        expect(jwtService.sign).toHaveBeenNthCalledWith(1, { 
            email: mockedEntity.email,
            sub: mockedEntity.id,
        })
        expect(result).toEqual(jwtProxy);
    });
});