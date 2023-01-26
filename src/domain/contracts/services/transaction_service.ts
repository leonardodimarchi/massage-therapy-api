export abstract class TransactionService {
    abstract startTransaction(): Promise<void>;
    abstract commitTransaction(): Promise<void>;
    abstract rollbackTransaction(): Promise<void>;
}