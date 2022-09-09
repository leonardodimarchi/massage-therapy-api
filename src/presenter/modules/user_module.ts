import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
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
import { LocalStrategy } from "../../infrastructure/strategies/authentication/local_strategy";
import { ValidateToLoginUsecase } from "../../domain/usecases/user/validate_to_login_usecase";
import { LoginUsecase } from "../../domain/usecases/user/login_usecase";
import { JwtService } from "../../domain/contracts/services/jwt_service";
import { JwtStrategy } from "../../infrastructure/strategies/authentication/jwt_strategy";
import { JwtServiceImplementation } from "../../infrastructure/services/jwt_service_implementation";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        PassportModule,
        JwtModule.register({
            secret: 'SECRET',
            signOptions: { 
                expiresIn: '7d',
            },
        }),
    ],
    controllers: [UserController],
    providers: [
        LocalStrategy,
        JwtStrategy,
        {
            provide: LoginUsecase,
            useFactory: (jwtService: JwtService) => new LoginUsecase(jwtService),
            inject: [JwtService]
        },
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
        },
        {
            provide: JwtService,
            useClass: JwtServiceImplementation,
        }
    ],
})
export class UserModule { }