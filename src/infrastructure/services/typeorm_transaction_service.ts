import { TransactionService } from "@/domain/contracts/services/transaction_service";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export class TypeOrmTransactionService implements TransactionService {
    constructor(
        @InjectDataSource()
        private readonly datasource: DataSource,
    ) { }

    private queryRunner: QueryRunner | null;

    async startTransaction() {
        if (this.queryRunner)
            throw new Error('Already started a transaction.');

        const queryRunner = this.datasource.createQueryRunner();

        await queryRunner.startTransaction();

        this.queryRunner = queryRunner;
    }

    async commitTransaction() {
        if (!this.queryRunner || !this.queryRunner.isTransactionActive)
            throw new Error('There\'s no active transaction.');


        await this.queryRunner.commitTransaction();
        await this.queryRunner.release();


        this.queryRunner = null;
    }

    async rollbackTransaction() {
        if (!this.queryRunner || !this.queryRunner.isTransactionActive)
            throw new Error('There\'s no active transaction.');

        await this.queryRunner.rollbackTransaction();
        await this.queryRunner.release();

        this.queryRunner = null;
    }
}