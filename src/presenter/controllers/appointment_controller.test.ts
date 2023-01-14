import { UserEntity } from "@/domain/entities/user/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { GetUserAppointmentsUsecase, GetUserAppointmentsUsecaseInput } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { PaginationOptionsQuery } from "@/presenter/models/queries/pagination_options.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { MockProxy, mock } from "jest-mock-extended";
import { makeAppointment } from "test/factories/appointment_factory";
import { makeUser } from "test/factories/user_factory";
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
        const input: CreateAppointmentPayload = {
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20).toISOString(),
            endsAt: new Date(2023, 8, 4).toISOString(),
        }

        const usecaseOutput = makeAppointment();

        const expectedResult = AppointmentViewModelMapper.toModel(usecaseOutput);

        it('should call the create usecase', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce({ createdAppointment: usecaseOutput });

            await controller.create({
                user: makeUser({ entityPropsOverride: { id: 2 } }),
            }, input);
        });

        it('should return a ViewModel', async () => {
            createAppointmentUsecase.call.mockResolvedValueOnce({ createdAppointment: usecaseOutput });

            const result = await controller.create({
                user: makeUser({ entityPropsOverride: { id: 2 } }),
            }, input);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an Forbidden HttpException when receiving a ValidationException', async () => {
            const mockedErrorMessage = 'Mocked error';
            createAppointmentUsecase.call.mockImplementationOnce(() => {
                throw new ValidationException(mockedErrorMessage);
            });

            expect(async () => await controller.create({
                user: makeUser(),
            }, input)).rejects.toThrow(new HttpException(
                mockedErrorMessage,
                HttpStatus.FORBIDDEN,
            ));
        });
    });

    describe('GetUserAppointments', () => {
        const request = { user: makeUser() };
        const paginationOptionsQuery: PaginationOptionsQuery = {
            page: 2,
        }

        it('should call the usecase', async () => {
            getUserAppointmentsUsecase.call.mockResolvedValueOnce({
                paginatedItems: {
                    count: 0,
                    items: [],
                    page: 1,
                    pageCount: 1,
                    total: 0,
                },
            })
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