import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentDatasourceImplementation } from "@/infra/datasources/appointment_datasource_implementation";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { FindOneOptions, Repository, MoreThanOrEqual, LessThanOrEqual } from "typeorm";

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

    describe('HasConflictingDates', () => {
        it('should return true if it finds an appointment', async () => {
            typeOrmRepository.findOne.mockResolvedValueOnce(mockedAppointmentEntity);

            const startDate = new Date(2022, 10, 2);
            const endDate = new Date(2022, 10, 6);

            const result = await datasource.hasConflictingDates(startDate, endDate);

            expect(typeOrmRepository.findOne).toHaveBeenCalledTimes(1);
            expect(result).toBeTruthy();
        });

        it('should return false if it doesn\'t finds an appointment', async () => {
            typeOrmRepository.findOne.mockResolvedValueOnce(null);

            const startDate = new Date(2022, 10, 2);
            const endDate = new Date(2022, 10, 6);

            const result = await datasource.hasConflictingDates(startDate, endDate);

            expect(typeOrmRepository.findOne).toHaveBeenCalledTimes(1);
            expect(result).toBeFalsy();
        });

        it('should find an appointment by passing the correct filter', async () => {
            const startDate = new Date(2022, 10, 2);
            const endDate = new Date(2022, 10, 6);
            const expectedOptions: FindOneOptions<AppointmentEntity> = {
                where: {
                    startsAt: MoreThanOrEqual(startDate),
                    endsAt: LessThanOrEqual(endDate),
                }
            };

            await datasource.hasConflictingDates(startDate, endDate);

            expect(typeOrmRepository.findOne).toHaveBeenNthCalledWith(1, expectedOptions);
        });
    });
});