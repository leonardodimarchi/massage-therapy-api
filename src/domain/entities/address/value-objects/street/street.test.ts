import { Street } from './street';

describe('ValueObjects - Street', () => {
    it('should be able to create with a valid value', () => {
        const valueObject = new Street('Rua Sandra Maria');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an empty text', () => {
        const createValueObject = () => new Street('');

        expect(createValueObject).toThrowError();
    });
});