import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { PasswordEncryptionService } from "@/domain/contracts/services/password_encryptation_service";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserSchema } from "@/infra/database/typeorm/schema/user_schema";
import { BcryptPasswordEncryptionService } from "@/infra/services/bcrypt_password_encryptation_service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@/presenter/controllers/user_controller";
import { AuthModule } from "@/presenter/modules/auth_module";
import { TypeOrmUserRepository } from "@/infra/database/typeorm/repositories/typeorm_user_repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        {
            provide: RegisterUsecase,
            useFactory: (repository: UserRepository, bcryptService: PasswordEncryptionService) => {
                return new RegisterUsecase(repository, bcryptService);
            },
            inject: [UserRepository, PasswordEncryptionService]
        },
        {
            provide: UserRepository,
            useClass: TypeOrmUserRepository,
        },
        {
            provide: PasswordEncryptionService,
            useClass: BcryptPasswordEncryptionService,
        },
    ],
})
export class UserModule { }