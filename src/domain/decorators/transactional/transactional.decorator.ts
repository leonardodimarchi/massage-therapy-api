import { DatabaseManager } from "@/domain/contracts/database/database_manager";
import { Inject } from "@nestjs/common";

export function Transactional(): MethodDecorator {
    const injectDatasource = Inject(DatabaseManager);

    return (target: any,  propertyKey: string, descriptor: PropertyDescriptor) => {
        injectDatasource(target, 'databaseManager');

        const datasource: DatabaseManager = this.databaseManager;

        const originalMethod = descriptor.value; 

        descriptor.value = async (...args: any[]) =>  {
            datasource.startTransaction();

            const runOriginalMethod = async () => await originalMethod.apply(target, args);

            return runOriginalMethod()
                .then(() => datasource.commitTransaction())
                .catch(() => datasource.rollbackTransaction());
        }

        return descriptor;
    };
}