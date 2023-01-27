import { TransactionService } from "@/domain/contracts/services/transaction_service";
import { TypeOrmTransactionService } from "@/infra/services/typeorm_transaction_service";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        TypeOrmModule,
    ],
    providers: [
        {
            provide: TransactionService,
            useClass: TypeOrmTransactionService,
        }
    ],
    exports: [
        TransactionService,
    ]
})
export class TransactionModule { }