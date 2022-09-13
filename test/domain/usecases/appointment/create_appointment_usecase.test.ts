import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { CreateAppointmentUsecase } from "@/domain/usecases/appointment/create_appointment_usecase";
import { MockProxy, mock } from "jest-mock-extended";

describe('CreateAppointmentUsecase', () => {
    let repository: MockProxy<AppointmentRepository>;
    let usecase: CreateAppointmentUsecase;

    beforeEach(() => {
        repository = mock<AppointmentRepository>();
        usecase = new CreateAppointmentUsecase(repository);
    });

    const entity: AppointmentEntity = new AppointmentEntity({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        complaint: '',
        isUnderMedicalTreatment: false,
        symptoms: '',
        startsAt: new Date(2023, 7, 20),
        endsAt: new Date(2023, 8, 4)
    });

    const payload: AppointmentPayload = new AppointmentPayload({
        userId: 2,
        complaint: '',
        isUnderMedicalTreatment: false,
        symptoms: '',
        startsAt: new Date(2023, 7, 20),
        endsAt: new Date(2023, 8, 4)
    });
    
    it('should get a user when calling the repository successfully', async () => {
        repository.create.mockResolvedValue(entity);

        const result = await usecase.call(payload);

        expect(result).toBe(entity);
        expect(repository.create).toHaveBeenNthCalledWith(1, payload);
    });
});