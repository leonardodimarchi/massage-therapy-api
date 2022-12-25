import { GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { UserEntity } from "@/domain/entities/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { MockProxy, mock } from "jest-mock-extended";
import { mockedAppointmentEntity } from "test/mocks/appointment_entity.mock";
import { mockedUserEntity } from "test/mocks/user_entity.mock";
import { FindOneOptions, Repository, MoreThanOrEqual, LessThanOrEqual, FindManyOptions } from "typeorm";
import { TypeOrmAppointmentRepository } from "./typeorm_appointment_repository";

describe('TypeOrmAppointmentRepository', () => {
    let typeOrmRepository: MockProxy<Repository<AppointmentEntity>>;
    let repository: TypeOrmAppointmentRepository;

    beforeEach(() => {
        typeOrmRepository = mock<Repository<AppointmentEntity>>();
        repository = new TypeOrmAppointmentRepository(typeOrmRepository);
    });

    describe('Create', () => {
        const entity = mockedAppointmentEntity;
        const payload = {
            userId: 2,
            complaint: '',
            isUnderMedicalTreatment: false,
            symptoms: '',
            startsAt: new Date(2023, 7, 20),
            endsAt: new Date(2023, 8, 4)
        };

        it('should create the entity at the database', async () => {
            typeOrmRepository.save.mockResolvedValue(entity);

            const result = await repository.create(payload);

            expect(result).toEqual(entity);
            expect(typeOrmRepository.save).toHaveBeenCalledTimes(1)
            expect(typeOrmRepository.save).toHaveBeenCalledWith(payload);
        });
    });

    describe('HasConflictingDates', () => {
        it('should return true if it finds an appointment', async () => {
            typeOrmRepository.findOne.mockResolvedValueOnce(mockedAppointmentEntity);

            const startDate = new Date(2022, 10, 2);
            const endDate = new Date(2022, 10, 6);

            const result = await repository.hasConflictingDates(startDate, endDate);

            expect(typeOrmRepository.findOne).toHaveBeenCalledTimes(1);
            expect(result).toBeTruthy();
        });

        it('should return false if it doesn\'t finds an appointment', async () => {
            typeOrmRepository.findOne.mockResolvedValueOnce(null);

            const startDate = new Date(2022, 10, 2);
            const endDate = new Date(2022, 10, 6);

            const result = await repository.hasConflictingDates(startDate, endDate);

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

            await repository.hasConflictingDates(startDate, endDate);

            expect(typeOrmRepository.findOne).toHaveBeenCalledTimes(1)
            expect(typeOrmRepository.findOne).toHaveBeenCalledWith(expectedOptions);
        });
    });

    describe('GetUserAppointments', () => {
        const userId = 2;
        const params: GetUserAppointmentsParams = { 
            user: new UserEntity({
                ...mockedUserEntity,
                id: userId,
            }),
            paginationOptions: {
                limit: 5,
                page: 1,
            }
         }

        it('should filter the user appointments', async () => {
            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                [], 
                0,
            ]);

            await repository.getUserAppointments(params);

            expect(typeOrmRepository.findAndCount).toHaveBeenCalledTimes(1)
            expect(typeOrmRepository.findAndCount).toHaveBeenCalledWith<FindManyOptions<AppointmentEntity>[]>({
                where: {
                    userId,
                },
                skip: 0,
                take: params.paginationOptions.limit,
            });
        });

        it('should use the pagination options if it exists', async () => {
            const limit = 5;
            const page = 1;
            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                [], 
                0,
            ]);

            await repository.getUserAppointments({
                ...params,
                paginationOptions: {
                    limit,
                    page,
                }
            });

            expect(typeOrmRepository.findAndCount).toHaveBeenCalledTimes(1);
            expect(typeOrmRepository.findAndCount).toHaveBeenCalledWith<FindManyOptions<AppointmentEntity>[]>({
                where: {
                    userId,
                },
                skip: 0,
                take: limit,
            });
        });

        it('should use the default pagination options if none is specified', async () => {
            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                [], 
                0,
            ]);

            await repository.getUserAppointments({
                ...params,
                paginationOptions: {
                    limit: undefined,
                    page: undefined,
                },
            });

            expect(typeOrmRepository.findAndCount).toHaveBeenCalledTimes(1);
            expect(typeOrmRepository.findAndCount).toHaveBeenCalledWith<FindManyOptions<AppointmentEntity>[]>({
                where: {
                    userId,
                },
                take: 10,
                skip: 0,
            });
        });

        it('should skip items correctly to match the pagination with page > 1', async () => {
            const limit = 5;
            const page = 2;
            const numberOfItemsToSkip = 5;
            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                [], 
                0,
            ]);

            await repository.getUserAppointments({
                ...params,
                paginationOptions: {
                    limit,
                    page,
                }
            });

            expect(typeOrmRepository.findAndCount).toHaveBeenCalledTimes(1);
            expect(typeOrmRepository.findAndCount).toHaveBeenCalledWith<FindManyOptions<AppointmentEntity>[]>({
                where: {
                    userId,
                },
                skip: numberOfItemsToSkip,
                take: limit,
            });
        });

        it('should return with the correct page count and page', async () => {
            const limit = 5;
            const page = 1;
            const total = 15;
            const pageCount = 3;
            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                [], 
                total,
            ]);

            const result = await repository.getUserAppointments({
                ...params,
                paginationOptions: {
                    limit,
                    page,
                }
            });
            
            expect(result.page).toBe(1);
            expect(result.pageCount).toEqual(pageCount);
        });

        it('should return paginated items', async () => {
            const mockedEntityList = [mockedAppointmentEntity, mockedAppointmentEntity];       
            const totalItems = 4;

            typeOrmRepository.findAndCount.mockResolvedValueOnce([
                mockedEntityList, 
                totalItems,
            ]);

            const expectedReturnValue: PaginatedItems<AppointmentEntity> = {
                page: 1,
                pageCount: 2,
                total: totalItems,
                count: mockedEntityList.length,
                items: mockedEntityList,
            }

            const result = await repository.getUserAppointments({
                ...params,
                paginationOptions: {
                    limit: mockedEntityList.length,
                    page: 1,
                }
            });

            expect(result).toEqual(expectedReturnValue);
        });
    });
});