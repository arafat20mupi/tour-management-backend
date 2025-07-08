import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// Middleware 
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Tour Management Backend Project')
})


export default app