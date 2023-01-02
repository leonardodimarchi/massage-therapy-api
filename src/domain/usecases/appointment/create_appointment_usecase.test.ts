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

    it('should not create if the start date is before now', async () => {
        const todayDate = new Date(2022, 10, 2);
        const startsAt = new Date(2022, 10, 1, 19);
        const endsAt = new Date(2022, 10, 1, 20);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload: CreateAppointmentUsecaseInput = {
            ...input,
            startsAt,
            endsAt,
        };

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
    });

    it('should not create if the start date is before now (With time)', async () => {
        const todayDate = new Date(2022, 10, 2, 10, 50, 23);
        const startsAt = new Date(2022, 10, 2, 10, 50, 22);
        const endsAt = new Date(2022, 10, 2, 12);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload: CreateAppointmentUsecaseInput = {
            ...input,
            startsAt,
            endsAt,
        };

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
    });

    it('should not create if the end date is before start date', async () => {
        const todayDate = new Date(2022, 10, 3, 15);
        const startsAt = new Date(2022, 10, 3, 17);
        const endsAt = new Date(2022, 10, 3, 16);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload: CreateAppointmentUsecaseInput = {
            ...input,
            startsAt,
            endsAt,
        }

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
    });

    it('should not create if the end date is equal start date', async () => {
        const todayDate = new Date(2022, 10, 3, 15);
        const startsAt = new Date(2022, 10, 3, 16, 10, 5);
        const endsAt = new Date(2022, 10, 3, 16, 10, 5);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload: CreateAppointmentUsecaseInput = {
            ...input,
            startsAt,
            endsAt,
        }

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
    });

    it('should not create if the start and end date don\'t have the same day', async () => {
        const todayDate = new Date(2022, 10, 2);
        const startsAt = new Date(2022, 10, 2);
        const endsAt = new Date(2022, 11, 3);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload: CreateAppointmentUsecaseInput = {
            ...input,
            startsAt,
            endsAt,
        };

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
    });

    it('should check if there is any conclicting appointments', async () => {
        await usecase.call(input);

        expect(async () => {
            await usecase.call(input)
        }).rejects.toThrowError(ValidationException);
    });

    it('should check if there is a valid symptom', async () => {
        expect(async () => {
            await usecase.call({
                ...input,
                symptoms: '',
            })
        }).rejects.toThrowError(ValidationException);
    });
});