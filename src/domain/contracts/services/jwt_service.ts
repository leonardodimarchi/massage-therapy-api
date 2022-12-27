export interface JwtSignParams {
    email: string,
    sub: number,
}

export abstract class JwtService {
    abstract sign(payload: JwtSignParams): string;
}