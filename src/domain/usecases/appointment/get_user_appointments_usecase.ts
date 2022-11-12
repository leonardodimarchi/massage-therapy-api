import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { UserEntity } from "@/domain/entities/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";

export type GetUserAppointmentsUsecaseInput = {
    user: UserEntity;
}

export type GetUserAppointmentsUsecaseOutput = PaginatedItems<AppointmentProxy>;

export class GetUserAppointmentsUsecase implements UseCase<GetUserAppointmentsUsecaseInput, GetUserAppointmentsUsecaseOutput> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call({ user }: GetUserAppointmentsUsecaseInput): Promise<PaginatedItems<AppointmentProxy>> {
        const result = await this.repository.getUserAppointments({ user });

        return {
            ...result,
            items: result.items.map(appointment => appointment.toProxy()),
        }
    }
}