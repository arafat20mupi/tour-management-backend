import dotenv from "dotenv"

dotenv.config()

interface EnvVars {
    PORT: string
    MONGODB_URI: string
    NODE_ENV: string
}

const loadEnvVars = () => {
    const requiredEnvVars : string[] = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}

export const envVars = loadEnvVars() as EnvVars;