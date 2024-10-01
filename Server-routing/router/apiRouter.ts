import http from 'http'

export class apiRouter{
    public static mapRoutes(request:http.IncomingMessage, response:http.ServerResponse){
        let url:string | undefined = request.url
        let method:string | undefined = request.method
        let result:string = ''

        if (url === '/' && method === 'GET'){
            result = "Welcome to server"
        }
        else if (url === '/about' && method === 'GET'){
            result = "About page"
        }
        else if (url === '/create' && method === 'POST'){
            result = "Create page"
        }
        else{
            result = "Page Not Found"
        }

        response.end(result)
    }
}