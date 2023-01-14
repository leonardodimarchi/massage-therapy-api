import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { Injectable } from "@nestjs/common";
import { TypeOrmAppointmentMapper } from "../mappers/typeorm_appointment.mapper";
import { AppointmentSchema, RawAppointmentEntity } from "../schema/appointment_schema";

@Injectable()
export class TypeOrmAppointmentRepository implements AppointmentRepository {
    constructor(
        @InjectRepository(AppointmentSchema)
        private typeOrmRepository: Repository<RawAppointmentEntity>,
    ) { }

    public async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        const raw = TypeOrmAppointmentMapper.toSchema(appointment);

        const savedEntity = await this.typeOrmRepository.save(raw);

        return TypeOrmAppointmentMapper.toDomain(savedEntity);
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
            items: rawItems.map(TypeOrmAppointmentMapper.toDomain),
            total,
        }
    }
}