export abstract class JwtService {
    abstract sign(payload: object | string): string;
}