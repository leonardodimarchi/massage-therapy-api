import { City } from "./city";

describe('ValueObjects - City', () => {
    it('should be able to create with a valid value', () => {
        const valueObject = new City('São Paulo');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an empty text', () => {
        const createValueObject = () => new City('');

        expect(createValueObject).toThrowError();
    });
});