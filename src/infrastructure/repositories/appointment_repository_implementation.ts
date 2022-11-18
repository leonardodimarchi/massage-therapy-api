import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { UserEntity } from "@/domain/entities/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentDatasource } from "@/infra/contracts/datasources/appointment_datasource";

export class AppointmentRepositoryImplementation implements AppointmentRepository {

    constructor(private readonly datasource: AppointmentDatasource) {}

    public async create(params: AppointmentPayload): Promise<AppointmentEntity> {
        return await this.datasource.create(params);
    }

    public async hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean> {
        return await this.datasource.hasConflictingDates(startDate, endDate);
    }

    public async getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
        return await this.datasource.getUserAppointments(params);
    }
}