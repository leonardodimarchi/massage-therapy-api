import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "@/presenter/controllers/auth_controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "@/infra/strategies/authentication/local_strategy";
import { JwtStrategy } from "@/infra/strategies/authentication/jwt_strategy";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { BcryptService } from "@/domain/contracts/services/bcrypt_service";
import { ValidateToLoginUsecase } from "@/domain/usecases/user/validate_to_login_usecase";
import { JwtServiceImplementation } from "@/infra/services/jwt_service_implementation";
import { JwtService } from "@/domain/contracts/services/jwt_service";
import { UserDatasource } from "@/infra/contracts/datasources/user_datasource";
import { UserDatasourceImplementation } from "@/infra/datasources/user_datasource_implementation";
import { UserRepositoryImplementation } from "@/infra/repositories/user_repository_implementation";
import { BcryptServiceImplementation } from "@/infra/services/bcrypt_service_implementation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "@/infra/database/schema/user_schema";
import { ConfigService } from "@nestjs/config";
import { ENV_AUTH_CONFIG_KEY } from "@/infra/configurations/authentication.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get(ENV_AUTH_CONFIG_KEY),
            })
        }),
    ],
    controllers: [AuthController],
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
            provide: UserRepository,
            useFactory: (datasource: UserDatasource) => new UserRepositoryImplementation(datasource),
            inject: [UserDatasource]
        },
        {
            provide: UserDatasource,
            useClass: UserDatasourceImplementation,
        },
        {
            provide: JwtService,
            useClass: JwtServiceImplementation,
        },
        {
            provide: BcryptService,
            useClass: BcryptServiceImplementation,
        },
    ],
})
export class AuthModule { }