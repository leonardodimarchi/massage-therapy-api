import { Module } from "@nestjs/common";
import { UserDatasource } from "../../infrastructure/contracts/datasources/user_datasource";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user_datasource_implementation";
import { UserRepository } from "../../domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user_repository_implementation";
import { UserController } from "../controllers/user_controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../../infrastructure/database/schema/user_schema";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema])
    ],
    controllers: [UserController],
    providers: [
        {
            provide: RegisterUsecase,
            useFactory: (repository: UserRepository) => new RegisterUsecase(repository),
            inject: [UserRepository]
        },
        {
            provide: UserRepository,
            useFactory: (datasource: UserDatasource) => new UserRepositoryImplementation(datasource),
            inject: [UserDatasource]
        },
        {
            provide: UserDatasource,
            useClass: UserDatasourceImplementation,
        },
    ],
})
export class UserModule { }