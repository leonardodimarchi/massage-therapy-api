import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { AppointmentPayload, AppointmentPayloadProps } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { GetUserAppointmentsUsecase, GetUserAppointmentsUsecaseInput } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { PaginationOptionsQuery } from "@/presenter/models/queries/pagination_options.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedUserEntity } from "test/mocks/user_entity.mock";
import { AppointmentViewModel } from "../models/view-models/appointment/appointment.view-model";

describe('AppointmentController', () => {
    let controller: AppointmentController;
    let createAppointmentUsecase: MockProxy<CreateAppointmentUsecase>;
    let getUserAppointmentsUsecase: MockProxy<GetUserAppointmentsUsecase>;

    beforeEach(() => {
        createAppointmentUsecase = mock<CreateAppointmentUsecase>();
        getUserAppointmentsUsecase = mock<GetUserAppointmentsUsecase>();
        controller = new AppointmentController(createAppointmentUsecase, getUserAppointmentsUsecase);
    });

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

        const expectedResult: AppointmentViewModel = {
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
            createAppointmentUsecase.call.mockResolvedValueOnce(proxy);

            await controller.create({
                user: new UserEntity({...mockedUserEntity, id: 2}),
            }, mockedPayloadProperties);

            expect(createAppointmentUsecase.call).toHaveBeenCalledWith(new AppointmentPayload({...mockedPayloadProperties}));
        });

        it('should return a ViewModel', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce(proxy);

            const result = await controller.create({
                user: mockedUserEntity,
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

    describe('GetUserAppointments', () => {
        const request = { user: mockedUserEntity };
        const paginationOptionsQuery: PaginationOptionsQuery = {
            page: 2,
        }

        it('should call the create usecase', async () => {
            const expectedParams: GetUserAppointmentsUsecaseInput = {
                user: request.user,
                paginationOptions: {
                    page: paginationOptionsQuery.page,
                    limit: paginationOptionsQuery.limit,
                }
            }

            await controller.getUserAppointments(request, paginationOptionsQuery);

            expect(getUserAppointmentsUsecase.call).toHaveBeenCalledTimes(1);
            expect(getUserAppointmentsUsecase.call).toHaveBeenCalledWith(expectedParams);
        });
    });
});