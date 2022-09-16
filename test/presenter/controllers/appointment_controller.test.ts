import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { UserProxy } from "@/domain/models/proxies/user_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { HttpException, HttpStatus } from "@nestjs/common";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('AppointmentController', () => {
    let controller: AppointmentController;
    let createAppointmentUsecase: MockProxy<CreateAppointmentUsecase>;

    beforeEach(() => {
        createAppointmentUsecase = mock<CreateAppointmentUsecase>();
        controller = new AppointmentController(createAppointmentUsecase);
    });

    const mockedEntity = mockedAppointmentEntity;
    const mockedUser = mockedUserEntity;

    describe('Create', () => {
        const params: AppointmentPayload = new AppointmentPayload({
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
        });

        const expectedResult = new AppointmentProxy({
            id: 1,
            createdAt: new Date(2023, 7, 20),
            updatedAt: new Date(2023, 7, 20),
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
        });

        it('should call the create usecase', async () => {
            await controller.create({
                user: {...mockedUserEntity, id: 2},
            }, params);

            expect(createAppointmentUsecase.call).toHaveBeenCalledWith(params);
        });

        it('should return a AppointmentProxy', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce(mockedEntity);

            const result = await controller.create({
                user: mockedUserEntity,
            }, params);

            expect(result).toEqual(expectedResult);
            expect(result).toBeInstanceOf(AppointmentProxy);
        });

        it('should throw an Forbidden HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            createAppointmentUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect(async () => await controller.create({
                user: mockedUserEntity,
            }, params)).rejects.toThrow(new HttpException(
                mockedErrorMessage,
                HttpStatus.FORBIDDEN,
            ));
        });
    });
});