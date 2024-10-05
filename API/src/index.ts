import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import { Server } from 'http'

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

server.listen(8080, () => {
    console.log(`Server is running on ${hostname}:${port}/`)
})