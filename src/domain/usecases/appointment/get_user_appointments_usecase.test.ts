import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { GetUserAppointmentsUsecase, GetUserAppointmentsUsecaseInput } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

describe('GetAppointmentsUsecase', () => {
    let repository: MockProxy<AppointmentRepository>;
    let usecase: GetUserAppointmentsUsecase;

    beforeEach(() => {
        repository = mock<AppointmentRepository>();
        usecase = new GetUserAppointmentsUsecase(repository);
    });

    const user = mockedUserEntity;
    const paginationOptions: PaginationOptions = {
        limit: 5,
        page: 1,
    };
    const entity = mockedAppointmentEntity;

    it('should call the repository', () => {
        const input: GetUserAppointmentsUsecaseInput = { user, paginationOptions };
        repository.getUserAppointments.mockResolvedValueOnce({
            items: [entity, entity],
            page: 1,
            count: 1,
            pageCount: 2,
            total: 2,
        });

        usecase.call(input);

        expect(repository.getUserAppointments).toHaveBeenNthCalledWith(1, input);
    });
});