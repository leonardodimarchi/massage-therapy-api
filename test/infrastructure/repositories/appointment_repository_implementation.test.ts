import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentDatasource } from "@/infra/contracts/datasources/appointment_datasource";
import { AppointmentRepositoryImplementation } from "@/infra/repositories/appointment_repository_implementation";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";

describe('AppointmentRepository', () => {
    let repository: AppointmentRepository;
    let datasource: MockProxy<AppointmentDatasource>

    beforeEach(() => {
        datasource = mock<AppointmentDatasource>();
        repository = new AppointmentRepositoryImplementation(datasource);
    });

    describe('Create', () => {
        const mockedReturn = mockedAppointmentEntity;
        const payload: AppointmentPayload = new AppointmentPayload({
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4)
        });
    
        it('should return a appointment entity when calling the datasource', async () => {
            datasource.create.mockResolvedValue(mockedReturn);

            const result = await repository.create(payload);

            expect(result).toEqual(mockedReturn);
            expect(datasource.create).toHaveBeenNthCalledWith(1, payload);
        });
    });

    describe('HasConflictingDates', () => {    
        it('should return the datasource result when calling the datasource', async () => {
            datasource.hasConflictingDates.mockResolvedValue(true);
            const startDate = new Date();
            const endDate = new Date();

            const result = await repository.hasConflictingDates(startDate, endDate);

            expect(result).toEqual(true);
            expect(datasource.hasConflictingDates).toHaveBeenNthCalledWith(1, startDate, endDate);
        });
    });
});