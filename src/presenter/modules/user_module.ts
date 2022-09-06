import { Module } from "@nestjs/common";
import { UserDatasource } from "../../infrastructure/contracts/datasources/user_datasource";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user_datasource_implementation";
import { UserRepository } from "../../domain/contracts/repositories/user_repository";
import { RegisterUsecase } from "../../domain/usecases/user/register_usecase";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user_repository_implementation";
import { UserController } from "../controllers/user_controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../../infrastructure/database/schema/user_schema";
import { BcryptService } from "../../domain/contracts/services/bcrypt_service";
import { BcryptServiceImplementation } from "../../infrastructure/services/bcrypt_service_implementation";
import { PassportModule } from "@nestjs/passport/dist";
import { LocalStrategy } from "../../infrastructure/authentication/strategies/local_strategy";
import { ValidateToLoginUsecase } from "../../domain/usecases/user/validate_to_login_usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        PassportModule,
    ],
    controllers: [UserController],
    providers: [
        LocalStrategy,
        {
            provide: ValidateToLoginUsecase,
            useFactory: (repository: UserRepository, bcryptService: BcryptService) => {
                return new ValidateToLoginUsecase(repository, bcryptService);
            },
            inject: [UserRepository, BcryptService]
        },
        {
            provide: RegisterUsecase,
            useFactory: (repository: UserRepository, bcryptService: BcryptService) => {
                return new RegisterUsecase(repository, bcryptService);
            },
            inject: [UserRepository, BcryptService]
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
        {
            provide: BcryptService,
            useClass: BcryptServiceImplementation,
        }
    ],
})
export class UserModule { }