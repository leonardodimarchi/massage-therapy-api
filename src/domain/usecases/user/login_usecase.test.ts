import { LoginUsecase, LoginUseCaseInput, LoginUseCaseOutput } from "@/domain/usecases/user/login_usecase";
import { JwtService } from "@nestjs/jwt";
import { MockProxy, mock } from "jest-mock-extended";
import { makeUser } from "test/factories/user_factory";

describe('LoginUsecase', () => {
    let jwtService: MockProxy<JwtService>;
    let usecase: LoginUsecase;

    beforeEach(() => {
        jwtService = mock<JwtService>();
        usecase = new LoginUsecase(jwtService);
    });

    const accessToken = 'mocked access_token';

    const input: LoginUseCaseInput = {
        user: makeUser(),
    };

    const expectedResult: LoginUseCaseOutput = {
        jwt: {
            access_token: accessToken,
        }
    };

    it('should return the output with a jwt having the correct access_token', () => {
        jwtService.sign.mockReturnValueOnce(accessToken);

        const result = usecase.call(input);

        expect(jwtService.sign).toHaveBeenNthCalledWith(1, { 
            email: input.user.email,
            sub: input.user.id,
        })
        expect(result).toEqual(expectedResult);
    });
});