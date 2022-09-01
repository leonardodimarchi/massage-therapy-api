import { Module } from "@nestjs/common";
import { UserDatasource } from "../../infrastructure/contracts/datasources/user_datasource";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user_datasource_implementation";
import { UserRepository } from "../../domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user_repository_implementation";
import { UserController } from "../controllers/user_controller";

@Module({
    controllers: [UserController],
    providers: [
        RegisterUsecase,
        { provide: UserRepository, useClass: UserRepositoryImplementation },
        { provide: UserDatasource, useClass: UserDatasourceImplementation },
    ],
})
export class UserModule { }