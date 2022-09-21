import { HttpException, HttpStatus } from "@nestjs/common";
import { mock, MockProxy } from "jest-mock-extended";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserPayload, UserPayloadProps } from "@/domain/models/payloads/user_payload";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserController } from "@/presenter/controllers/user_controller";
import { CreateUserDto } from "@/presenter/dto/user/create-user.dto";
import { CreatedUserDto } from "@/presenter/dto/user/created-user.dto";

describe('UserController', () => {
    let controller: UserController;
    let registerUsecase: MockProxy<RegisterUsecase>;

    beforeEach(() => {
        registerUsecase = mock<RegisterUsecase>();
        controller = new UserController(registerUsecase);
    });
   
    describe('Register', () => {
        const params: CreateUserDto = {
            email: 'Mocked email',
            name: 'Mocked Name',
            birthDate: new Date(11, 10, 2000),
            phone: 'Mocked phone',
            password: '123456'
        };

        const expectedResult: CreatedUserDto = {
            id: 1,
            createdAt: new Date(11, 10, 2000),
            updatedAt: new Date(11, 10, 2000),
            email: 'Mocked email',
            name: 'Mocked Name',
            birthDate: new Date(11, 10, 2000),
            phone: 'Mocked phone',
        }

        it('should call register usecase', async () => {
            await controller.register(params);

            expect(registerUsecase.call).toHaveBeenCalledWith(new UserPayload(params));
        });

        it('should return a UserProxy', async () => {
            registerUsecase.call.mockResolvedValueOnce(expectedResult);

            const result = await controller.register(params);

            expect(result).toEqual(expectedResult);
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
    });
});