import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { BcryptService } from "@/domain/contracts/services/bcrypt_service";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserSchema } from "@/infra/database/schema/user_schema";
import { BcryptServiceImplementation } from "@/infra/services/bcrypt_service_implementation";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@/presenter/controllers/user_controller";
import { AuthModule } from "@/presenter/modules/auth_module";
import { TypeormUserRepository } from "@/infra/database/repositories/typeorm_user_repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        {
            provide: RegisterUsecase,
            useFactory: (repository: UserRepository, bcryptService: BcryptService) => {
                return new RegisterUsecase(repository, bcryptService);
            },
            inject: [UserRepository, BcryptService]
        },
        {
            provide: UserRepository,
            useClass: TypeormUserRepository,
        },
        {
            provide: BcryptService,
            useClass: BcryptServiceImplementation,
        },
    ],
})
export class UserModule { }