import http from 'http';

http.createServer((request, response) => {
    response.end("hello")
})
.listen(3000, () => console.log("server started"))