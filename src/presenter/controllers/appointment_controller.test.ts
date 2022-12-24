import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { AppointmentPayload, AppointmentPayloadProps } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase, CreateAppointmentUsecaseInput } from "@/domain/usecases/appointment/create_appointment_usecase";
import { GetUserAppointmentsUsecase, GetUserAppointmentsUsecaseInput } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { PaginationOptionsQuery } from "@/presenter/models/queries/pagination_options.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";
import { CreateAppointmentPayload } from "../models/payloads/appointment/create-appointment.payload";
import { AppointmentViewModelMapper } from "../models/view-models/appointment/appointment.view-model.mapper";

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
        const input: CreateAppointmentUsecaseInput = {
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4),
            userId: 2,
        }

        const usecaseOutput = mockedAppointmentEntity;

        const expectedResult = AppointmentViewModelMapper.toModel(usecaseOutput);

        it('should call the create usecase', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce({ createdAppointment: usecaseOutput });

            await controller.create({
                user: new UserEntity({...mockedUserEntity, id: 2 }),
            }, input);

        });

        it('should return a ViewModel', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce({ createdAppointment: usecaseOutput });

            const result = await controller.create({
                user: new UserEntity({ ...mockedUserEntity, id: 2 }),
            }, input);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an Forbidden HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            createAppointmentUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect(async () => await controller.create({
                user: mockedUserEntity,
            }, input)).rejects.toThrow(new HttpException(
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