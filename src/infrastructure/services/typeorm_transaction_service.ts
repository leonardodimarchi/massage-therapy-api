import { TransactionService } from "@/domain/contracts/services/transaction_service";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class TypeOrmTransactionService implements TransactionService {
    constructor(
        @InjectDataSource()
        private readonly datasource: DataSource,
    ) { }

    async startTransaction() {
        return this.datasource.createQueryRunner().startTransaction();
    }

    async commitTransaction() {
        return this.datasource.createQueryRunner().commitTransaction();
    }

    async rollbackTransaction() {
        return this.datasource.createQueryRunner().rollbackTransaction();
    }
}