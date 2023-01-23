import { Entity, EntityProps } from "../../shared/entity";
import { AddressEntity } from "../address/address_entity";
import { AppointmentEntity } from "../appointment/appointment_entity";
import { UserGenderEnum } from "./enum/user_gender.enum";
import { UserBirthdate } from "./value-objects/birthdate/user_birthdate";
import { UserDiseaseHistory } from "./value-objects/disease-history/disease_history";
import { UserEmail } from "./value-objects/email/user_email";
import { UserName } from "./value-objects/name/user_name";
import { UserPassword } from "./value-objects/password/user_password";
import { UserPhone } from "./value-objects/phone/user_phone";

export interface UserProps {
  email: UserEmail;
  name: UserName;
  phone: UserPhone;
  birthDate: UserBirthdate;
  password: UserPassword;
  gender: UserGenderEnum;
  diseaseHistory?: UserDiseaseHistory;

  address?: AddressEntity;
  appointments?: AppointmentEntity[];
}

export class UserEntity extends Entity {
  constructor(props: UserProps, entityProps?: EntityProps) {
    super(entityProps);

    this.props = props;
  }

  private props: UserProps;

  public set email(email: UserEmail) {
    this.props.email = email;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public set name(name: UserName) {
    this.props.name = name;
  }

  public get name(): UserName {
    return this.props.name;
  }

  public set phone(phone: UserPhone) {
    this.props.phone = phone;
  }

  public get phone(): UserPhone {
    return this.props.phone;
  }

  public set birthDate(birthDate: UserBirthdate) {
    this.props.birthDate = birthDate;
  }

  public get birthDate(): UserBirthdate {
    return this.props.birthDate;
  }

  public set password(password: UserPassword) {
    this.props.password = password;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  public set gender(gender: UserGenderEnum) {
    this.props.gender = gender;
  }

  public get gender(): UserGenderEnum {
    return this.props.gender;
  }

  public set diseaseHistory(diseaseHistory: UserDiseaseHistory) {
    this.props.diseaseHistory = diseaseHistory;
  }

  public get diseaseHistory(): UserDiseaseHistory {
    return this.props.diseaseHistory;
  }

  public set address(address: AddressEntity) {
    this.props.address = address;
  }

  public get address(): AddressEntity {
    return this.props.address;
  }

  public set appointments(appointments: AppointmentEntity[]) {
    this.props.appointments = appointments;
  }

  public get appointments(): AppointmentEntity[] {
    return this.props.appointments;
  }
}