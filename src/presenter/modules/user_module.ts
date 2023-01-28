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
import { AddressRepository } from "@/domain/contracts/repositories/address_repository";
import { TypeOrmAddressRepository } from "@/infra/database/typeorm/repositories/typeorm_address_repository";
import { AddressSchema } from "@/infra/database/typeorm/schema/address_schema";
import { TransactionService } from "@/domain/contracts/services/transaction_service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserSchema,
            AddressSchema,
        ]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        {
            provide: RegisterUsecase,
            useFactory: (
                repository: UserRepository,
                addressRepository: AddressRepository,
                bcryptService: PasswordEncryptionService,
                transactionService: TransactionService,
            ) => {
                return new RegisterUsecase(
                    repository,
                    addressRepository,
                    bcryptService,
                    transactionService,
                );
            },
            inject: [
                UserRepository, 
                AddressRepository, 
                PasswordEncryptionService,
                TransactionService,
            ]
        },
        {
            provide: UserRepository,
            useClass: TypeOrmUserRepository,
        },
        {
            provide: AddressRepository,
            useClass: TypeOrmAddressRepository,
        },
        {
            provide: PasswordEncryptionService,
            useClass: BcryptPasswordEncryptionService,
        },
    ],
})
export class UserModule { }