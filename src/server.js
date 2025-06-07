import http from 'http';

http.createServer(
    (request, response) => {
        if(request.url === '/hello-world'){
            response.writeHead(200, {"Content-Type": 'Application/Json'});
            response.end(JSON.stringify({'message':'Hello World'}));
        }
    }
).listen(8080);