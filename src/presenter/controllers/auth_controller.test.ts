import { JwtProxy } from "@/domain/models/proxies/jwt_proxy";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
import { LoginUsecase, LoginUseCaseOutput } from "@/domain/usecases/user/login_usecase";
import { AuthController } from "@/presenter/controllers/auth_controller";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('AuthController', () => {
    let controller: AuthController;
    let loginUsecase: MockProxy<LoginUsecase>;

    beforeEach(() => {
        loginUsecase = mock<LoginUsecase>();
        controller = new AuthController(loginUsecase);
    });

    const mockedEntity = mockedUserEntity;

    describe('Login', () => {
        it('should call login usecase with the user entity', () => {
            const usecaseOutput: LoginUseCaseOutput = {
                jwt: new JwtProxy({
                    access_token: 'mock',
                }),
                loggedUser: new UserProxy({...mockedEntity}),
            }
            loginUsecase.call.mockReturnValueOnce(usecaseOutput)

            controller.login({ user: mockedEntity });

            expect(loginUsecase.call).toHaveBeenNthCalledWith(1, mockedEntity);
        });
    });
});