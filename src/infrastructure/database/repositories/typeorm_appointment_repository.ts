import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentSchema } from "@/infra/database/schema/appointment_schema";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TypeOrmAppointmentRepository implements AppointmentRepository {
    constructor(
        @InjectRepository(AppointmentSchema)
        private typeOrmRepository: Repository<AppointmentEntity>,
    ) { }

    public async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        return await this.typeOrmRepository.save({
            complaint: appointment.complaint,
            createdAt: appointment.createdAt,
            endsAt: appointment.endsAt,
            id: appointment.id,
            isPregnant: appointment.isPregnant,
            isUnderMedicalTreatment: appointment.isUnderMedicalTreatment,
            pregnantWeeks: appointment.pregnantWeeks,
            startsAt: appointment.startsAt,
            status: appointment.status,
            symptoms: appointment.symptoms,
            updatedAt: appointment.updatedAt,
            userId: appointment.userId,
        });
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

    public async getUserAppointments({ user, paginationOptions }: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
        const defaultPaginationOptions: PaginationOptions = {
            limit: 10,
            page: 1,
        };

        const { limit, page } = Object.assign(defaultPaginationOptions, {
            ...paginationOptions.page && { page: paginationOptions.page },
            ...paginationOptions.limit && { limit: paginationOptions.limit },
        });

        const [rawItems, total] = await this.typeOrmRepository.findAndCount({
            where: {
                userId: user.id,
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            page,
            pageCount: Math.ceil(total / limit),
            count: rawItems.length,
            items: rawItems.map(i => new AppointmentEntity({
                complaint: i.complaint,
                endsAt: i.endsAt,
                isPregnant: i.isPregnant,
                isUnderMedicalTreatment: i.isUnderMedicalTreatment,
                pregnantWeeks: i.pregnantWeeks,
                startsAt: i.startsAt,
                status: i.status,
                symptoms: i.symptoms,
                userId: i.userId,
            }, {
                id: i.id,
                createdAt: i.createdAt,
                updatedAt: i.updatedAt,
            })),
            total,
        }
    }
}