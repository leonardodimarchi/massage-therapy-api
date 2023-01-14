import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { UserEntity } from "@/domain/entities/user/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";

export interface GetUserAppointmentsUsecaseInput {
    user: UserEntity;
    paginationOptions?: PaginationOptions;
}

export interface GetUserAppointmentsUsecaseOutput {
    paginatedItems: PaginatedItems<AppointmentEntity>;
};

export class GetUserAppointmentsUsecase implements UseCase<GetUserAppointmentsUsecaseInput, GetUserAppointmentsUsecaseOutput> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call({ user, paginationOptions }: GetUserAppointmentsUsecaseInput): Promise<GetUserAppointmentsUsecaseOutput> {
        const paginatedItems = await this.repository.getUserAppointments({ user, paginationOptions });

        return {
            paginatedItems,
        }
    }
}