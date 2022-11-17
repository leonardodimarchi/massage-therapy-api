import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { GetUserAppointmentsUsecase } from "@/domain/usecases/appointment/get_user_appointments_usecase";
import { JwtAuthGuard } from "@/infra/guards/authentication/jwt_auth_guard";
import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req, Query, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppointmentDto } from "../dto/appointment/appointment.dto";
import { CreateAppointmentDto } from "../dto/appointment/create-appointment.dto";
import { CreatedAppointmentDto } from "../dto/appointment/created-appointment.dto";
import { PaginatedItemsDto } from "../dto/shared/paginated-items.dto";
import { PaginationOptionsQuery } from "../models/queries/pagination_options.query";

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
    @ApiCreatedResponse({ description: 'O agendamento foi criado com sucesso', type: CreatedAppointmentDto })
    public async create(@Req() req: { user: UserEntity }, @Body() payload: CreateAppointmentDto): Promise<CreatedAppointmentDto> {
        try {
            const result = await this.createAppointmentUsecase.call(new AppointmentPayload({
                ...payload,
                userId: req.user.id
            }));

            return {
                ...result,
            }
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
    @ApiCreatedResponse({ description: 'Listagem obtida com sucesso', type: PaginatedItemsDto<AppointmentDto> })
    public async getUserAppointments(
        @Req() req: { user: UserEntity },
        @Query() paginationOptionsQuery: PaginationOptionsQuery,
    ): Promise<PaginatedItemsDto<AppointmentDto>> {
        return await this.getAppointmentsUsecase.call({
            user: req.user,
            paginationOptions: {
                page: paginationOptionsQuery.page,
                limit: paginationOptionsQuery.limit,
            }
        });
    }
}