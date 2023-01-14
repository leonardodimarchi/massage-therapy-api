import { set, reset } from "mockdate";

export class TestDateUtils {
    static setTestDate(date: Date): void {
        set(date);
    }

    static resetTestDate(): void {
        reset();
    }
}