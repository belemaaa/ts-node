import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import { Server } from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server: Server = http.createServer(app)

const port: number = 8080
const hostname: string = "http://localhost"

server.listen(port, () => {
    console.log(`Server is running on ${hostname}:${port}/`)
})

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME || 'defaultUsername'}:${process.env.MONGO_PASSWORD || 'defaultPassword'}@${process.env.MONGO_CLUSTER || 'defaultCluster'}/?retryWrites=true&w=majority`;

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

console.log(MONGO_URL)