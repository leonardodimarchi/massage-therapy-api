import { Entity, EntityProps } from "../../shared/entity";
import { AppointmentEntity } from "../appointment/appointment_entity";
import { UserBirthdate } from "./value-objects/birthdate/user_birthdate";
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

    appointments?: AppointmentEntity[];
}

export class UserEntity extends Entity {
    private props: UserProps;

    constructor(props: UserProps, entityProps?: EntityProps) {
        super(entityProps);

        this.props = props;
    }
    
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
    
    public get appointments(): AppointmentEntity[] {
        return this.props.appointments;
      }
}