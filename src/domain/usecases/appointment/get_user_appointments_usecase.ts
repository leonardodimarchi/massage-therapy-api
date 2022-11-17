import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { UserEntity } from "@/domain/entities/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";

export type GetUserAppointmentsUsecaseInput = {
    user: UserEntity;
    paginationOptions?: PaginationOptions;
}

export type GetUserAppointmentsUsecaseOutput = Promise<PaginatedItems<AppointmentProxy>>;

export class GetUserAppointmentsUsecase implements UseCase<GetUserAppointmentsUsecaseInput, GetUserAppointmentsUsecaseOutput> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call({ user, paginationOptions }: GetUserAppointmentsUsecaseInput): Promise<PaginatedItems<AppointmentProxy>> {
        const result = await this.repository.getUserAppointments({ user, paginationOptions });

        return {
            ...result,
            items: result.items.map(appointment => appointment.toProxy()),
        }
    }
}