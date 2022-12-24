import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { GetUserAppointmentsUsecase } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { JwtAuthGuard } from "@/infra/guards/authentication/jwt_auth_guard";
import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req, Query, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateAppointmentPayload } from "../models/payloads/appointment/create-appointment.payload";
import { PaginationOptionsQuery } from "../models/queries/pagination_options.query";
import { AppointmentViewModel } from "../models/view-models/appointment/appointment.view-model";
import { AppointmentViewModelMapper } from "../models/view-models/appointment/appointment.view-model.mapper";
import { PaginatedItemsViewModel } from "../models/view-models/shared/paginated-items.view-model";

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUsecase: CreateAppointmentUsecase,
        private readonly getAppointmentsUsecase: GetUserAppointmentsUsecase,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo agendamento' })
    @ApiCreatedResponse({ description: 'O agendamento foi criado com sucesso', type: CreateAppointmentPayload })
    public async create(
        @Req() req: { user: UserEntity },
         @Body() {
            complaint,
            startsAt,
            endsAt,
            symptoms,
            isPregnant,
            isUnderMedicalTreatment,
            pregnantWeeks,
         }: CreateAppointmentPayload): Promise<AppointmentViewModel> {
        try {
            const { createdAppointment } = await this.createAppointmentUsecase.call({
                complaint,
                startsAt,
                endsAt,
                symptoms,
                isPregnant,
                isUnderMedicalTreatment,
                pregnantWeeks,
                userId: req.user.id,
            });

            return AppointmentViewModelMapper.toModel(createdAppointment);
        } catch (error) {
            if (error instanceof ValidationException)
                throw new HttpException(
                    error.message,
                    HttpStatus.BAD_REQUEST,
                );

            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Listar seus agendamentos' })
    @ApiCreatedResponse({ description: 'Listagem obtida com sucesso', type: PaginatedItemsViewModel<AppointmentViewModel> })
    public async getUserAppointments(
        @Req() req: { user: UserEntity },
        @Query() paginationOptionsQuery: PaginationOptionsQuery,
    ): Promise<PaginatedItemsViewModel<AppointmentViewModel>> {
        return await this.getAppointmentsUsecase.call({
            user: req.user,
            paginationOptions: {
                page: paginationOptionsQuery.page,
                limit: paginationOptionsQuery.limit,
            }
        });
    }
}