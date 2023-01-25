export abstract class DatabaseManager {
    abstract startTransaction(): void;
    abstract commitTransaction(): void;
    abstract rollbackTransaction(): void;
}