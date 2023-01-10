export class UserValidator {
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