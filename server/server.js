//Import Statements
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { connectDb } from './database/configuration/configuration.js'
import userRoutes from './routes/userRoutes.js'
import 'colors'

//Dotenv Configuration
dotenv.config()

//Express Object
const app = express();

//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Database Connection
connectDb()

//Routes
app.use('/api/v1/auth',userRoutes)

//Port
const PORT = process.env.PORT || 8080

//Listening Server
app.listen(PORT,()=>{
    console.log(`Welcome Server Successfully Running On Port ${PORT}`.bgYellow.white)
})