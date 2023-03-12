import { mock, MockProxy } from "jest-mock-extended";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserController } from "@/presenter/controllers/user_controller";
import { CreateUserPayload } from "@/presenter/models/payloads/user/create_user.payload";
import { UserViewModelMapper } from "../models/view-models/user/user.view-model.mapper";
import { makeUser } from "test/factories/user_factory";
import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";

describe('UserController', () => {
    let controller: UserController;
    let registerUsecase: MockProxy<RegisterUsecase>;

    beforeEach(() => {
        registerUsecase = mock<RegisterUsecase>();
        controller = new UserController(registerUsecase);
    });
   
    describe('Register', () => {
        const params: CreateUserPayload = {
            email: 'Mocked email',
            name: 'Mocked Name',
            birthDate: new Date(11, 10, 2000).toISOString(),
            phone: 'Mocked phone',
            password: '123456',
            gender: UserGenderEnum.MALE,
            address: {
                city: 'city',
                state: 'state',
                street: 'Rua Sandra Tereza',
                postalCode: '23857394',
                houseNumber: 1,
                neighborhood: 'neighborhood',
            },
        };

        const usecaseOutput = makeUser();

        const expectedResult = UserViewModelMapper.toModel(usecaseOutput);

        it('should call register usecase', async () => {
            registerUsecase.call.mockResolvedValueOnce({ createdUser: usecaseOutput });

            await controller.register(params);

            expect(registerUsecase.call).toHaveBeenCalledTimes(1);
        });

        it('should return the ViewModel', async () => {
            registerUsecase.call.mockResolvedValueOnce({ createdUser: usecaseOutput });

            const result = await controller.register(params);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an BadRequest HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            registerUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect.assertions(1);
            try {
                await controller.register(params);
            } catch (e) {
                expect(e.status).toBe(400);
            }
        });
    });
});