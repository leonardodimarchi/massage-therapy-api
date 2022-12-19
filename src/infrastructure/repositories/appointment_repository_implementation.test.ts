import { AppointmentRepository, GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentDatasource } from "@/infra/contracts/datasources/appointment_datasource";
import { AppointmentRepositoryImplementation } from "./appointment_repository_implementation";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";

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

    describe('GetUserAppointments', () => {
        const paginationOptions: PaginationOptions = {
            limit: 5,
            page: 1,
        }

        it('should return paginated items from the datasource', async () => {
            const params: GetUserAppointmentsParams = { user: mockedUserEntity, paginationOptions };
            const datasourceReturnValue: PaginatedItems<AppointmentEntity> = {
                items: [mockedAppointmentEntity, mockedAppointmentEntity],
                page: 1,
                count: 1,
                pageCount: 2,
                total: 2,
            }
            datasource.getUserAppointments.mockResolvedValue(datasourceReturnValue);

            const result = await repository.getUserAppointments(params);

            expect(result).toEqual(datasourceReturnValue);
            expect(datasource.getUserAppointments).toHaveBeenNthCalledWith(1, params);
        });
    });
});