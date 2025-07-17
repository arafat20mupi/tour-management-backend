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
    SUPAR_ADMIN_EMAIL: string
}

const loadEnvVars = () => {
    const requiredEnvVars: string[] = ['PORT', 'MONGODB_URI', 'NODE_ENV' , "JWT_ACCESS_SECRET" , "JWT_ACCESS_EXPIRES" , "BCRYPT_SALT_ROUND" , "SUPAR_ADMIN_PASSWORD" , "SUPAR_ADMIN_EMAIL"];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production" ,
        JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        SUPAR_ADMIN_EMAIL: process.env.SUPAR_ADMIN_EMAIL as string,
        SUPAR_ADMIN_PASSWORD: process.env.SUPAR_ADMIN_PASSWORD as string,
    }
}

export const envVars = loadEnvVars() as EnvVars;