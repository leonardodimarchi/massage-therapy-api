import { Entity, EntityProps } from "../shared/entity";
import { AppointmentEntity } from "./appointment/appointment_entity";

export interface UserProps {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    appointments?: AppointmentEntity[];
}

export class UserEntity extends Entity {
    private props: UserProps;

    constructor(props: UserProps, entityProps?: EntityProps) {
        super(entityProps);

        this.props = props;
    }
    
    public set email(email: string) {
      this.props.email = email;
    }
    
    public get email(): string {
      return this.props.email;
    }
    
    public set name(name: string) {
      this.props.name = name;
    }
    
    public get name(): string {
      return this.props.name;
    }

    public set phone(phone: string) {
      this.props.phone = phone;
    }
    
    public get phone(): string {
      return this.props.phone;
    }
    
    public set birthDate(birthDate: Date) {
      this.props.birthDate = birthDate;
    }
    
    public get birthDate(): Date {
      return this.props.birthDate;
    }
    
    public set password(password: string) {
      this.props.password = password;
    }
    
    public get password(): string {
      return this.props.password;
    }
    
    public get appointments(): AppointmentEntity[] {
        return this.props.appointments;
      }
}