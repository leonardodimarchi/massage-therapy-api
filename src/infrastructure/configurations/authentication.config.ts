import { registerAs } from "@nestjs/config"

export const ENV_AUTH_CONFIG_KEY = 'auth';

export interface AuthConfig {
    secret: string,
    signOptions: { 
        expiresIn: string,
    },
}

export default registerAs<AuthConfig>(ENV_AUTH_CONFIG_KEY, () => {
    return {
        secret: process.env.JWT_KEY,
        signOptions: { 
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    }
})