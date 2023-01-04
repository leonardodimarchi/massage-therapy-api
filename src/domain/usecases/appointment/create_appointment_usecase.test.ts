import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { CreateAppointmentUsecase, CreateAppointmentUsecaseInput } from "@/domain/usecases/appointment/create_appointment_usecase";
import { InMemoryAppointmentRepository } from "test/repositories/in_memory_appointment_repository";

describe('CreateAppointmentUsecase', () => {
    let repository: InMemoryAppointmentRepository;
    let usecase: CreateAppointmentUsecase;

    beforeEach(() => {
        repository = new InMemoryAppointmentRepository();
        usecase = new CreateAppointmentUsecase(repository);
    });

    const input: CreateAppointmentUsecaseInput = {
        userId: 2,
        complaint: 'Valid complaint',
        isUnderMedicalTreatment: false,
        symptoms: 'Valid symptoms',
        startsAt: new Date(2023, 7, 20, 18),
        endsAt: new Date(2023, 7, 20, 19)
    };

    it('should get the created appointment when creating successfully', async () => {
        const { createdAppointment } = await usecase.call(input);

        expect(createdAppointment).toEqual(expect.any(AppointmentEntity));
        expect(repository.appointments).toHaveLength(1);
    });

    it('should always create a appointment with the PENDING status', async () => {
        await usecase.call(input);

        expect(repository.appointments[0].status).toEqual(AppointmentStatusEnum.PENDING);
    });

    it('should check if there is any conclicting appointments', async () => {
        await usecase.call(input);

        expect(async () => {
            await usecase.call(input)
        }).rejects.toThrowError(ValidationException);
    });
});