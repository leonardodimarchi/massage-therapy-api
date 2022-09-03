import { Validators } from "../shared/validations/validators";

export class UserValidator {
    public static isValidEmail(email: string): boolean {
        return Validators.isValidEmail(email);
    }

    public static isValidName(name: string): boolean {
        return !!name.length;
    }

    public static isValidPhone(phone: string): boolean {
        return !!phone.length;
    }

    public static isValidBirthDate(birthDate: Date): boolean {
        return !!birthDate;
    }

    public static isValidPassword(password: string): boolean {
        return !!password?.length
    }
}