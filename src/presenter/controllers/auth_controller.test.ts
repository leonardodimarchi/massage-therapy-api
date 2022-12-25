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
        const usecaseOutput: LoginUseCaseOutput = {
            jwt: {
                access_token: 'mock'
            }
        }

        it('should call login usecase with the user entity', () => {

            loginUsecase.call.mockReturnValueOnce(usecaseOutput)

            controller.login({ user: mockedEntity });

            expect(loginUsecase.call).toHaveBeenNthCalledWith(1, { user: mockedEntity });
        });
    });
});