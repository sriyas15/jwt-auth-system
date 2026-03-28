import express from 'express'
import dotenv from 'dotenv'
import userRoutes from "./src/routes/userRoutes.js"
import { connectDB } from './src/config/db.js'
import cookieParser from 'cookie-parser'

dotenv.config({path:"backend/.env"})

const app = express()

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRoutes)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is Running from ${process.env.PORT}`)
})