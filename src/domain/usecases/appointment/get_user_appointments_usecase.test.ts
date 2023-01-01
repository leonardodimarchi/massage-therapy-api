import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { GetUserAppointmentsUsecase } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { makeAppointment } from "test/factories/appointment_factory";
import { makeUser } from "test/factories/user_factory";
import { InMemoryAppointmentRepository } from "test/repositories/in_memory_appointment_repository";

describe('GetAppointmentsUsecase', () => {
    let repository: InMemoryAppointmentRepository;
    let usecase: GetUserAppointmentsUsecase;

    beforeEach(() => {
        repository = new InMemoryAppointmentRepository();
        usecase = new GetUserAppointmentsUsecase(repository);
    });

    it('should return paginated items received from the repository', async () => {
        const userId = 22
        const user = makeUser({ entityPropsOverride: { id: userId } });
        const paginationOptions: PaginationOptions = {
            limit: 1,
            page: 1,
        };
        const entity = makeAppointment({ override: { userId } });

        await repository.create(entity);
        await repository.create(entity);

        const { paginatedItems } = await usecase.call({ user, paginationOptions });

        expect(paginatedItems).toEqual({
            items: [entity],
            page: 1,
            count: 1,
            pageCount: 2,
            total: 2,
        });
    });
});