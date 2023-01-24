import { Neighborhood } from "./neighborhood";

describe('ValueObjects - Neighborhood', () => {
    it('should be able to create with a valid value', () => {
        const valueObject = new Neighborhood('Valid neighborhood');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an empty text', () => {
        const createValueObject = () => new Neighborhood('');

        expect(createValueObject).toThrowError();
    });
});