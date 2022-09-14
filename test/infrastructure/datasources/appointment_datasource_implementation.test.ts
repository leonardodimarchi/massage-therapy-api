import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentDatasourceImplementation } from "@/infra/datasources/appointment_datasource_implementation";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";
import { Repository } from "typeorm";

describe('AppointmentDatasource', () => {
    let typeOrmRepository: MockProxy<Repository<AppointmentEntity>>;
    let datasource: AppointmentDatasourceImplementation;

    beforeEach(() => {
        typeOrmRepository = mock<Repository<AppointmentEntity>>();
        datasource = new AppointmentDatasourceImplementation(typeOrmRepository);
    });

    describe('Create', () => {
        const entity = mockedAppointmentEntity;
        const payload: AppointmentPayload = new AppointmentPayload({
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4)
        });

        it('should create the entity at the database', async () => {
            typeOrmRepository.save.mockResolvedValue(entity);

            const result = await datasource.create(payload);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.save).toHaveBeenNthCalledWith(1, payload);
        });
    });
});