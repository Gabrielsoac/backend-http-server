import http from 'http';
import { dbConnection } from './database/dbConnection.js';
import { createNews, findAllNews, findNewsById, updateNewsById } from './services/newsService.js';

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
            const articlesCollection = await db.collection('articles');

            if(request.url === '/hello-world' && request.method === 'GET'){
                response.writeHead(200, {"content-type": 'application/json'});
                response.end(JSON.stringify({'message':'Hello World'}));
                return;
            }

            if(request.url === '/' && request.method === 'POST') {
                let body = '';
                request.on('data', (chunk) => {
                    body += chunk;
                });

                request.on('end', async () => {
                    const bodyData = JSON.parse(body);
                    const persistedData = await createNews(articlesCollection, bodyData);
                    const news = await findNewsById(articlesCollection, persistedData.insertedId);
                    response.writeHead(201, { 'content-type': 'application/json' });
                    response.end(JSON.stringify(news));
                });
                return;
            }

            if(request.url === "/" && request.method === 'GET'){
                const articlesCollection = await db.collection('articles');
                const allNews = await findAllNews(articlesCollection);
                response.writeHead(200, { 'content-type': 'application/json' })
                response.end(JSON.stringify(allNews));
                return;
            }

            if(request.url.length === 25 && request.method === 'PUT'){
                
                const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
                const path = parsedUrl.pathname;
                const match = path.match(/^\/([a-f\d]{24})$/i);
                const id = match[1];
                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                });

                request.on('end', async () => {
                    const bodyRaw = Buffer.concat(body).toString();
                    let bodyJson = null;
                    try {
                        bodyJson = JSON.parse(bodyRaw);
                    }catch(err){
                        throw new Error('Invalid news update data');
                    }
                    const articlesCollection = await db.collection('articles');
                    const updatedNews = await updateNewsById(articlesCollection, id, bodyJson);
                    
                    if(updatedNews === null) {
                        response.writeHead(404);
                        response.end('News not found');
                        return;
                    }
                    response.writeHead(200, {"content-type": 'application/json'});
                    response.end(JSON.stringify(updatedNews));
                }); 
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