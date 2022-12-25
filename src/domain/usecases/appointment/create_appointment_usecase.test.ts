import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { CreateAppointmentUsecase, CreateAppointmentUsecaseInput } from "@/domain/usecases/appointment/create_appointment_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";

describe('CreateAppointmentUsecase', () => {
    let repository: MockProxy<AppointmentRepository>;
    let usecase: CreateAppointmentUsecase;

    beforeEach(() => {
        repository = mock<AppointmentRepository>();
        usecase = new CreateAppointmentUsecase(repository);
    });

    const entity = mockedAppointmentEntity;

    const input: CreateAppointmentUsecaseInput = {
        userId: 2,
        complaint: 'Valid complaint',
        isUnderMedicalTreatment: false,
        symptoms: 'Valid symptoms',
        startsAt: new Date(2023, 7, 20, 18),
        endsAt: new Date(2023, 7, 20, 19)
    };

    it('should get the created appointment when creating successfully', async () => {
        repository.create.mockResolvedValue(entity);

        const { createdAppointment } = await usecase.call(input);

        expect(createdAppointment).toEqual(entity);
    });

    it('should always create a appointment with the PENDING status', async () => {
        await usecase.call(input);

        expect(repository.create).toHaveBeenNthCalledWith(1, {
            ...input,
            status: AppointmentStatusEnum.PENDING,
        });
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
        expect(repository.create).not.toHaveBeenCalled();
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
        expect(repository.create).not.toHaveBeenCalled();
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
        expect(repository.create).not.toHaveBeenCalled();
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
        expect(repository.create).not.toHaveBeenCalled();
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
        expect(repository.create).not.toHaveBeenCalled();
    });

    it('should check if there is any conclicting appointments', async () => {
        repository.hasConflictingDates.mockResolvedValueOnce(true);

        expect(async () => {
            await usecase.call(input)
        }).rejects.toThrowError(ValidationException);
        expect(repository.hasConflictingDates).toHaveBeenNthCalledWith(1, input.startsAt, input.endsAt);
    });

    it('should check if there is a valid complaint', async () => {
        expect(async () => {
            await usecase.call({
                ...input,
                complaint: '',
            })
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