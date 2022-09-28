import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { AppointmentPayload, AppointmentPayloadProps } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { CreatedAppointmentDto } from "@/presenter/dto/appointment/created-appointment.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('AppointmentController', () => {
    let controller: AppointmentController;
    let createAppointmentUsecase: MockProxy<CreateAppointmentUsecase>;

    beforeEach(() => {
        createAppointmentUsecase = mock<CreateAppointmentUsecase>();
        controller = new AppointmentController(createAppointmentUsecase);
    });

    const mockedUser = mockedUserEntity;

    describe('Create', () => {
        const mockedPayloadProperties: AppointmentPayloadProps = {
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
        };

        const proxy = new AppointmentProxy({
            id: 1,
            createdAt: new Date(2023, 7, 20),
            updatedAt: new Date(2023, 7, 20),
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
            status: AppointmentStatusEnum.PENDING,
        });

        const expectedResult: CreatedAppointmentDto = {
            id: 1,
            createdAt: new Date(2023, 7, 20),
            updatedAt: new Date(2023, 7, 20),
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
            status: AppointmentStatusEnum.PENDING,
        }

        it('should call the create usecase', async () => {
            await controller.create({
                user: {...mockedUser, id: 2},
            }, mockedPayloadProperties);

            expect(createAppointmentUsecase.call).toHaveBeenCalledWith(new AppointmentPayload({...mockedPayloadProperties}));
        });

        it('should return a AppointmentProxy', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce(proxy);

            const result = await controller.create({
                user: mockedUser,
            }, mockedPayloadProperties);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an Forbidden HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            createAppointmentUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect(async () => await controller.create({
                user: mockedUserEntity,
            }, mockedPayloadProperties)).rejects.toThrow(new HttpException(
                mockedErrorMessage,
                HttpStatus.FORBIDDEN,
            ));
        });
    });
});