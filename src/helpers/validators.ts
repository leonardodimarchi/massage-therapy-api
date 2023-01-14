export namespace Validators {
    export function isValidEmail(email: string): boolean {
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

        return emailRegex.test(email);
    }

    export function isValidPassword(value: string): boolean {
        return value.trim().length >= 6 && value.trim().length <= 512;
    }
}