import { Entity, EntityProps } from "../../shared/entity";
import { UserEntity } from "../user/user_entity";
import { City } from "./value-objects/city/city";
import { Neighborhood } from "./value-objects/neighborhood/neighborhood";
import { PostalCode } from "./value-objects/postal-code/postal_code";
import { State } from "./value-objects/state/state";
import { Street } from "./value-objects/street/street";

export interface AddressProps {
  postalCode: PostalCode;
  state: State;
  city: City;
  street: Street;
  neighborhood: Neighborhood;
  houseNumber: number;
  userId: number;

  user?: UserEntity;
}

export class AddressEntity extends Entity<AddressProps> {
  constructor(props: AddressProps, entityProps?: EntityProps) {
    super(props, entityProps);
  }

  public set postalCode(postalCode: PostalCode) {
    this.props.postalCode = postalCode;
  }

  public get postalCode(): PostalCode {
    return this.props.postalCode;
  }

  public set state(state: State) {
    this.props.state = state;
  }

  public get state(): State {
    return this.props.state;
  }

  public set city(city: City) {
    this.props.city = city;
  }

  public get city(): City {
    return this.props.city;
  }

  public set street(street: Street) {
    this.props.street = street;
  }

  public get street(): Street {
    return this.props.street;
  }

  public set neighborhood(neighborhood: Neighborhood) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): Neighborhood {
    return this.props.neighborhood;
  }

  public set houseNumber(houseNumber: number) {
    this.props.houseNumber = houseNumber;
  }

  public get houseNumber(): number {
    return this.props.houseNumber;
  }

  public set userId(id: number) {
    this.props.userId = id;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public get user(): UserEntity {
    return this.props.user;
  }
}