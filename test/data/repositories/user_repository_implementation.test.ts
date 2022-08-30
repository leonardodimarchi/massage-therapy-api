import { MockProxy, mock } from "jest-mock-extended";
import { UserDatasource } from "../../../src/data/contracts/datasources/user_datasource";
import { UserRepositoryImplementation } from "../../../src/data/repositories/user_repository_implementation";
import { UserRepository } from "../../../src/domain/contracts/repositories/user_repository";

describe('UserRepository', () => {
    let repository: UserRepository;
    let datasource: MockProxy<UserDatasource>

    beforeEach(() => {
        datasource = mock<UserDatasource>();
        repository = new UserRepositoryImplementation(datasource);
    });

    describe('Register', () => {
        it('should return a user proxy', () => {

        });
    })
});