import http from 'http';
import { dbConnection } from './database/dbConnection.js';

let db = null;

const startServer = async () => {

    try {
        db = await dbConnection();
    } catch (err){
        console.log('Error to connnect database: ' + err.message);
        process.exit(1);
    }

    http.createServer(
        async (request, response) => {
            if(request.url === '/hello-world' && request.method === 'GET'){
                response.writeHead(200, {"content-type": 'application/json'});
                response.end(JSON.stringify({'message':'Hello World'}));
                return;
            }

            response.writeHead(404, {"content-type": "application/json"});
            response.end(JSON.stringify({"error": "Not Found"}));
        }
    ).listen(8080, () => {
        console.log('🚀 Server run on http://localhost:8080')
    });
}

startServer();