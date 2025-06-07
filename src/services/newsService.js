import { ObjectId } from "mongodb";

export async function createNews(collection, newsData) {
    const news = await collection.insertOne(newsData);
    return news;
}

export async function findNews(collection, id) {
    const news = await collection.findOne({ _id: new ObjectId(id) });
    return news;
}