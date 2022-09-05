export abstract class BcryptService {
    abstract hash(hashString: string): Promise<string>;
    abstract compare(password: string, hashPassword: string): Promise<boolean>;
}