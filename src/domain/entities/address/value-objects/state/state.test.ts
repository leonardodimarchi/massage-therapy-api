import { State } from "./state";

describe('ValueObjects - State', () => {
    it('should be able to create with a valid value', () => {
        const valueObject = new State('São Paulo');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an empty text', () => {
        const createValueObject = () => new State('');

        expect(createValueObject).toThrowError();
    });
});