import { JwtProxy } from "@/domain/models/proxies/jwt_proxy";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
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
    const mockedUserProxy = new UserProxy({...mockedEntity});

    const accessToken = 'mocked access_token';
    const jwtProxy = new JwtProxy({
        access_token: accessToken,
    });

    it('should return the output with a JwtProxy having the correct access_token and user', () => {
        jwtService.sign.mockReturnValueOnce(accessToken);

        const result = usecase.call(mockedEntity);

        expect(jwtService.sign).toHaveBeenNthCalledWith(1, { 
            email: mockedEntity.email,
            sub: mockedEntity.id,
        })
        expect(result.jwt).toEqual(jwtProxy);
        expect(result.loggedUser).toEqual(mockedUserProxy);
    });
});