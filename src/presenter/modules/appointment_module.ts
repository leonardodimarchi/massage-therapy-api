import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/presenter/modules/auth_module";
import { AppointmentSchema } from "@/infra/database/schema/appointment_schema";
import { AppointmentController } from "@/presenter/controllers/appointment_controller";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentDatasource } from "@/infra/contracts/datasources/appointment_datasource";
import { AppointmentDatasourceImplementation } from "@/infra/datasources/appointment_datasource_implementation";
import { AppointmentRepositoryImplementation } from "@/infra/repositories/appointment_repository_implementation";

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
            inject: [CreateAppointmentUsecase]
        },
        {
            provide: AppointmentRepository,
            useFactory: (datasource: AppointmentDatasource) => new AppointmentRepositoryImplementation(datasource),
            inject: [AppointmentDatasource]
        },
        {
            provide: AppointmentDatasource,
            useClass: AppointmentDatasourceImplementation,
        },
    ],
})
export class AppointmentModule { }