import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentSchema } from "@/infra/database/schema/appointment_schema";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AppointmentDatasource } from "@/infra/contracts/datasources/appointment_datasource";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export class AppointmentDatasourceImplementation implements AppointmentDatasource {
    constructor(
        @InjectRepository(AppointmentSchema)
        private typeOrmRepository: Repository<AppointmentEntity>,
    ) { }

    public async create(params: AppointmentPayload): Promise<AppointmentEntity> {
        return await this.typeOrmRepository.save(params);
    }

    public async hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean> {
        const conflictingAppointment = await this.typeOrmRepository.findOne({
            where: {
                startsAt: MoreThanOrEqual(startDate),
                endsAt: LessThanOrEqual(endDate),
            }
        });

        return !!conflictingAppointment;
    }
}