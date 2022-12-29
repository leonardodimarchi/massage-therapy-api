import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";

export class InMemoryAppointmentRepository implements AppointmentRepository {

    public appointments: AppointmentEntity[] = []

    public async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        this.appointments.push(appointment);

        return appointment;
    }

    public async hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean> {
        const conflictingAppointment = this.appointments.find(appointment => {
            const startsAtMoreThanOrEqual = appointment.startsAt.getTime() >= startDate.getTime();
            const endsAtLessThanOrEqual = appointment.endsAt.getTime() <= endDate.getTime();

            return startsAtMoreThanOrEqual && endsAtLessThanOrEqual;
        });

        return !!conflictingAppointment;
    }

    public async getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
        const items = this.appointments.filter(appointment => appointment.userId === params.user.id);

        return {
            items,
            count: items.length,
            page: 1,
            pageCount: 1,
            total: items.length,
        };
    }
}