import { HttpException, HttpStatus } from "@nestjs/common";
import { mock, MockProxy } from "jest-mock-extended";
import { ValidationException } from "../../../src/domain/exceptions/validation_exception";
import { UserRegisterPayload } from "../../../src/domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../../src/domain/usecases/user/register_usecase";
import { UserController } from "../../../src/presenter/controllers/user_controller";

describe('UserController', () => {
    let controller: UserController;
    let registerUsecase: MockProxy<RegisterUsecase>;

    beforeEach(() => {
        registerUsecase = mock<RegisterUsecase>();
        controller = new UserController(registerUsecase);
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

            expect(registerUsecase.call).toHaveBeenCalledWith(params);
        });

        it('should throw an Forbidden HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            registerUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect(async () => await controller.register(params)).rejects.toThrow(new HttpException(
                mockedErrorMessage,
                HttpStatus.FORBIDDEN,
            ));
        });
    })
});