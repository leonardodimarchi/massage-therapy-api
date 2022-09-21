import { UserEntity } from "@/domain/entities/user_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload, AppointmentPayloadProps } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { JwtAuthGuard } from "@/infra/guards/authentication/jwt_auth_guard";
import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateAppointmentDto } from "../dto/appointment/create-appointment.dto";
import { CreatedAppointmentDto } from "../dto/appointment/created-appointment.dto";

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUsecase: CreateAppointmentUsecase,
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
}