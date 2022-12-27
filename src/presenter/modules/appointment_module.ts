import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/presenter/modules/auth_module";
import { AppointmentSchema } from "@/infra/database/typeorm/schema/appointment_schema";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { GetUserAppointmentsUsecase } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { TypeOrmAppointmentRepository } from "@/infra/database/typeorm/repositories/typeorm_appointment_repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([AppointmentSchema]),
        AuthModule,
    ],
    controllers: [AppointmentController],
    providers: [
        {
            provide: CreateAppointmentUsecase,
            useFactory: (repository: AppointmentRepository) => {
                return new CreateAppointmentUsecase(repository);
            },
            inject: [AppointmentRepository]
        },
        {
            provide: GetUserAppointmentsUsecase,
            useFactory: (repository: AppointmentRepository) => {
                return new GetUserAppointmentsUsecase(repository);
            },
            inject: [AppointmentRepository]
        },
        {
            provide: AppointmentRepository,
            useClass: TypeOrmAppointmentRepository
        },
    ],
})
export class AppointmentModule { }