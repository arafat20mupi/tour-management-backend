"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVars = () => {
    const requiredEnvVars = [
        'PORT',
        'MONGODB_URI',
        'NODE_ENV',
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRES",
        "BCRYPT_SALT_ROUND",
        "SUPAR_ADMIN_PASSWORD",
        "SUPAR_ADMIN_EMAIL",
        "JWT_REFRESH_EXPIRES",
        "JWT_REFRESH_SECRET",
        "FRONTEND_URL",
        "EXPRESS_SESSION_SECRET",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "GOOGLE_CALLBACK_URL", "SSL_STORE_ID",
        "SSL_STORE_PASS",
        "SSL_PAYMENT_API", "SSL_VALIDATION_API", "SSL_SUCCESS_FRONTEND_URL",
        "SSL_FAIL_FRONTEND_URL",
        "SSL_CANCEL_FRONTEND_URL",
        "SSL_SUCCESS_BACKEND_URL",
        "SSL_FAIL_BACKEND_URL",
        "SSL_CANCEL_BACKEND_URL",
    ];
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        SUPAR_ADMIN_EMAIL: process.env.SUPAR_ADMIN_EMAIL,
        SUPAR_ADMIN_PASSWORD: process.env.SUPAR_ADMIN_PASSWORD,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        FRONTEND_URL: process.env.FRONTEND_URL,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        // ssl
        SSL: {
            STORE_ID: process.env.SSL_STORE_ID,
            STORE_PASS: process.env.SSL_STORE_PASS,
            SSL_PAYMENT_API: process.env.SSL_PAYMENT_API,
            SSL_VALIDATION_API: process.env.SSL_VALIDATION_API,
            SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL,
            SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL,
            SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL,
            SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL,
            SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL,
            SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL,
        },
    };
};
exports.envVars = loadEnvVars();
