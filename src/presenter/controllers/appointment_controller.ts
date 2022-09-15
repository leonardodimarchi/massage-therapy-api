import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";

@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUsecase: CreateAppointmentUsecase,
    ) { }

    @Post()
    public async create(@Body() payload: AppointmentPayload): Promise<AppointmentProxy> {
        try {
            const result = await this.createAppointmentUsecase.call(payload);

            return new AppointmentProxy({ ...result });
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