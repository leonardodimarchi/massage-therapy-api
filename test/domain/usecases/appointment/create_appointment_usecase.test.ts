import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";

describe('CreateAppointmentUsecase', () => {
    let repository: MockProxy<AppointmentRepository>;
    let usecase: CreateAppointmentUsecase;

    beforeEach(() => {
        repository = mock<AppointmentRepository>();
        usecase = new CreateAppointmentUsecase(repository);
    });

    const entity: AppointmentEntity = mockedAppointmentEntity;

    const proxy: AppointmentProxy = new AppointmentProxy({
        ...entity,
    });

    const payload: AppointmentPayload = new AppointmentPayload({
        userId: 2,
        complaint: 'Valid complaint',
        isUnderMedicalTreatment: false,
        symptoms: 'Valid symptoms',
        startsAt: new Date(2023, 7, 20),
        endsAt: new Date(2023, 8, 4)
    });

    it('should get a appointment proxy when calling the repository successfully', async () => {
        repository.create.mockResolvedValue(entity);

        const result = await usecase.call(payload);

        expect(result).toEqual(proxy);
        expect(repository.create).toHaveBeenNthCalledWith(1, payload);
    });

    it('should not create if the start date is before now', async () => {
        const todayDate = new Date(2022, 10, 2);
        const startsAt = new Date(2022, 10, 1);
        const endsAt = new Date(2022, 10, 2);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload = new AppointmentPayload({
            ...payload,
            startsAt,
            endsAt,
        })

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
        expect(repository.create).not.toHaveBeenCalled();
    });

    it('should not create if the start date is before now (With time)', async () => {
        const todayDate = new Date(2022, 10, 2, 10, 50, 23);
        const startsAt = new Date(2022, 10, 2, 10, 50, 22);
        const endsAt = new Date(2022, 10, 3);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload = new AppointmentPayload({
            ...payload,
            startsAt,
            endsAt,
        })

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
        expect(repository.create).not.toHaveBeenCalled();
    });

    it('should not create if the end date is before start date', async () => {
        const todayDate = new Date(2022, 10, 2);
        const startsAt = new Date(2022, 10, 3);
        const endsAt = new Date(2022, 10, 2);

        jest.useFakeTimers().setSystemTime(todayDate);

        const invalidPayload = new AppointmentPayload({
            ...payload,
            startsAt,
            endsAt,
        })

        expect(async () => {
            await usecase.call(invalidPayload)
        }).rejects.toThrowError(ValidationException);
        expect(repository.create).not.toHaveBeenCalled();
    });

    it('should check if there is any conclicting appointments', async () => {
        repository.hasConflictingDates.mockResolvedValueOnce(true);

        expect(async () => {
            await usecase.call(payload)
        }).rejects.toThrowError(ValidationException);
        expect(repository.hasConflictingDates).toHaveBeenNthCalledWith(1, payload.startsAt, payload.endsAt);
    });

    it('should check if there is a valid complaint', async () => {
        expect(async () => {
            await usecase.call(new AppointmentPayload({
                ...payload,
                complaint: '',
            }))
        }).rejects.toThrowError(ValidationException);
    });

    it('should check if there is a valid symptom', async () => {
        expect(async () => {
            await usecase.call(new AppointmentPayload({
                ...payload,
                symptoms: '',
            }))
        }).rejects.toThrowError(ValidationException);
    });
});