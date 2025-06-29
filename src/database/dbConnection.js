import { MongoClient } from "mongodb";

const url = 'mongodb://db:27017';
const client = new MongoClient(url);
const dbName = 'techArt';

let dbInstance;

export async function dbConnection(){

    if(dbInstance) return dbInstance;

    try {
        await client.connect();
        console.log('✅ Connect to MongoDB');
        return dbInstance = client.db(dbName);
    }
    catch(err){
        console.log('❌ connect db error: ' + err.message);
        throw err;
    }
}