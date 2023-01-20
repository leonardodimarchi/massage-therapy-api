import { AddressEntity } from "./address_entity";
import { City } from "./value-objects/city/city";
import { Neighborhood } from "./value-objects/neighborhood/neighborhood";
import { PostalCode } from "./value-objects/postal-code/postal_code";
import { State } from "./value-objects/state/state";

describe('AddressEntity', () => {
    it('should be able to instantiate the entity', () => {
        const entity = new AddressEntity({
            postalCode: new PostalCode('28874639'),
            state: new State('São Paulo'),
            city: new City('Tatui'),
            neighborhood: new Neighborhood('Valid neighborhood'),
            houseNumber: 1,
        });

        expect(entity).toBeDefined();
    });
});