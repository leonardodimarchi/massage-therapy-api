import { MockProxy, mock } from "jest-mock-extended";
import { Repository } from "typeorm";
import { UserRegisterPayload, UserRepository } from "../../../src/domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../../src/domain/usecases/user/register_usecase";
import { UserController } from "../../../src/presenter/controllers/user_controller";

describe('UserController', () => {
    let controller: UserController;

    beforeEach(() => {
        const repository = mock<UserRepository>();
        controller = new UserController(repository);
    });

    const params = new UserRegisterPayload({
        email: 'valid@email.com',
        name: 'Mocked name',
        phone: '15992280628',
        birthDate: new Date(),
        password: '123456'
    });

    describe('Register', () => {
        it('should call register usecase', async () => {
            await controller.register(params);

            // expect(RegisterUsecase().call).toHaveBeenCalledWith(params);
        });
    })
});