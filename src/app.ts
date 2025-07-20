/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import passport from 'passport';
import expressSession from 'express-session';
import { envVars } from './app/config/env';
import './app/config/passport';

const app: Application = express()

// Middleware 
app.use(express.json())
app.use(cookieParser());
app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax', // Adjust based on your needs
  }
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));


// Routes
app.use('/api/v1', router)


app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Tour Management Backend Project')
})


export default app