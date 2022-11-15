import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
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

    it('should transform the entities to proxy', async () => {
        const input: GetUserAppointmentsUsecaseInput = { user, paginationOptions };
        repository.getUserAppointments.mockResolvedValueOnce({
            items: [entity, entity],
            page: 1,
            count: 1,
            pageCount: 2,
            total: 2,
        });

        const result = await usecase.call(input);

        expect(result).toEqual<PaginatedItems<AppointmentProxy>>({
            items: [new AppointmentProxy(entity), new AppointmentProxy(entity)],
            page: 1,
            count: 1,
            pageCount: 2,
            total: 2,
        });

        expect(result.items[0]).toBeInstanceOf(AppointmentProxy);
        expect(result.items[1]).toBeInstanceOf(AppointmentProxy);
    });
});