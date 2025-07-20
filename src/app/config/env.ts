import dotenv from "dotenv"

dotenv.config()

interface EnvVars {
    PORT: string
    MONGODB_URI: string
    NODE_ENV: string
    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES: string
    BCRYPT_SALT_ROUND: string
    SUPAR_ADMIN_PASSWORD: string
    SUPAR_ADMIN_EMAIL: string,
    JWT_REFRESH_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    FRONTEND_URL: string,
    EXPRESS_SESSION_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CALLBACK_URL: string,
}

const loadEnvVars = () => {
    const requiredEnvVars: string[] = ['PORT', 'MONGODB_URI', 'NODE_ENV', "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND", "SUPAR_ADMIN_PASSWORD", "SUPAR_ADMIN_EMAIL", "JWT_REFRESH_EXPIRES", "JWT_REFRESH_SECRET" , "FRONTEND_URL", "EXPRESS_SESSION_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_CALLBACK_URL"];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        SUPAR_ADMIN_EMAIL: process.env.SUPAR_ADMIN_EMAIL as string,
        SUPAR_ADMIN_PASSWORD: process.env.SUPAR_ADMIN_PASSWORD as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    }
}

export const envVars = loadEnvVars() as EnvVars;