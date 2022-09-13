import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
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
}