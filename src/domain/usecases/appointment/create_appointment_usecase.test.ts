import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { CreateAppointmentUsecase, CreateAppointmentUsecaseInput } from "@/domain/usecases/appointment/create_appointment_usecase";
import { ONE_MILLISECOND } from "@/helpers/date_constants";
import { InMemoryAppointmentRepository } from "test/repositories/in_memory_appointment_repository";
import { TestDateUtils } from "test/utils/test_date_utils";

describe('CreateAppointmentUsecase', () => {
    let repository: InMemoryAppointmentRepository;
    let usecase: CreateAppointmentUsecase;

    beforeAll(() => {
        TestDateUtils.setTestDate(new Date());
    });

    beforeEach(() => {
        repository = new InMemoryAppointmentRepository();
        usecase = new CreateAppointmentUsecase(repository);
    });

    afterAll(() => {
        TestDateUtils.resetTestDate();
    });

    const getInput = (): CreateAppointmentUsecaseInput => ({
        userId: 2,
        complaint: 'Valid complaint',
        isUnderMedicalTreatment: false,
        symptoms: 'Valid symptoms',
        startsAt: new Date(new Date().getTime() + ONE_MILLISECOND),
        endsAt: new Date(new Date().getTime() + (2 * ONE_MILLISECOND))
    });

    it('should get the created appointment when creating successfully', async () => {
        const { createdAppointment } = await usecase.call(getInput());

        expect(createdAppointment).toEqual(expect.any(AppointmentEntity));
        expect(repository.appointments).toHaveLength(1);
    });

    it('should always create a appointment with the PENDING status', async () => {
        await usecase.call(getInput());

        expect(repository.appointments[0].status).toEqual(AppointmentStatusEnum.PENDING);
    });

    it('should check if there is any conclicting appointments', async () => {
        await usecase.call(getInput());

        expect(async () => {
            await usecase.call(getInput())
        }).rejects.toThrowError(ValidationException);
    });
});