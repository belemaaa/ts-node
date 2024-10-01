import http, {Server, IncomingMessage, ServerResponse} from 'http'
import os from 'os'
import fs from 'fs'
import path from 'path'

const hostname: string = '127.0.0.1'
const port: number = 5000

const server: Server = http.createServer(( request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200
    response.setHeader('Content-Type' , 'text/html')

    // os module
    let osData = {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homedir: os.homedir(),
        computerName: os.hostname(),
        platform: os.platform()
    }

    // fs module
    fs.readFile(path.join(__dirname, 'data', 'notes.txt'), 'utf-8', (error, result) => {
        if(error){
            throw(error)
        }
        fs.writeFile(path.join(__dirname, 'data', 'data.txt'), result, 'utf-8', (error) => {
            if(error){
                throw error
            }
        })
        response.end(`${result}`)
    })

    //response.end("Welcome to nodejs server</h3>")
    response.end(`${JSON.stringify(osData)}`)
})

server.listen(port, hostname, () => {
    console.log(`Node JS server is started at http://${hostname}:${port}`)
})