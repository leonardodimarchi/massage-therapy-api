import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "@/presenter/controllers/auth_controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "@/infra/strategies/authentication/local_strategy";
import { JwtStrategy } from "@/infra/strategies/authentication/jwt_strategy";
import { LoginUsecase } from "@/domain/usecases/user/login_usecase";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { ValidateToLoginUsecase } from "@/domain/usecases/user/validate_to_login_usecase";
import { JwtServiceImplementation } from "@/infra/services/jwt_service_implementation";
import { JwtService } from "@/domain/contracts/services/jwt_service";
import { BcryptPasswordEncryptionService } from "@/infra/services/bcrypt_password_encryptation_service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "@/infra/database/schema/user_schema";
import { ConfigService } from "@nestjs/config";
import { ENV_AUTH_CONFIG_KEY } from "@/infra/configurations/authentication.config";
import { TypeOrmUserRepository } from "@/infra/database/repositories/typeorm_user_repository";

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
            useFactory: (repository: UserRepository, bcryptService: PasswordEncryptionService) => {
                return new ValidateToLoginUsecase(repository, bcryptService);
            },
            inject: [UserRepository, PasswordEncryptionService]
        },
        {
            provide: UserRepository,
            useClass: TypeOrmUserRepository,
        },
        {
            provide: JwtService,
            useClass: JwtServiceImplementation,
        },
        {
            provide: PasswordEncryptionService,
            useClass: BcryptPasswordEncryptionService,
        },
    ],
})
export class AuthModule { }