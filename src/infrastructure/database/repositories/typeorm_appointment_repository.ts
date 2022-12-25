import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentSchema } from "@/infra/database/schema/appointment_schema";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { Injectable } from "@nestjs/common";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";

@Injectable()
export class TypeOrmAppointmentRepository implements AppointmentRepository {
    constructor(
        @InjectRepository(AppointmentSchema)
        private typeOrmRepository: Repository<AppointmentEntity>,
    ) { }

    public async create(params: {
        userId: number;
        complaint: string;
        isUnderMedicalTreatment: boolean;
        symptoms: string;
        startsAt: Date;
        endsAt: Date;
        isPregnant?: boolean;
        pregnantWeeks?: number;
        status?: AppointmentStatusEnum,
    }): Promise<AppointmentEntity> {
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

    public async getUserAppointments({ user, paginationOptions }: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
        const defaultPaginationOptions: PaginationOptions = {
            limit: 10,
            page: 1,
        };

        const { limit, page } = Object.assign(defaultPaginationOptions, {
            ...paginationOptions.page && { page: paginationOptions.page },
            ...paginationOptions.limit && { limit: paginationOptions.limit },
        });

        const [items, total] = await this.typeOrmRepository.findAndCount({
            where: {
                userId: user.id,
            },
            skip: (page-1) * limit,
            take: limit,
        });

        return {
            page,
            pageCount: Math.ceil(total / limit),
            count: items.length,
            items: items.map(i => new AppointmentEntity(i)),
            total,
        }
    }
}