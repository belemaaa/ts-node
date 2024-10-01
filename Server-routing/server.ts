import http, { Server, IncomingMessage, ServerResponse } from "http";
import { apiRouter } from "./router/apiRouter";

const hostname:string = '127.0.0.1'
const port:number = 8000

const server:Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    apiRouter.mapRoutes(request, response)
})

server.listen(port, hostname, () => {
    console.log(`server is listening at http://${hostname}:${port}`)
})