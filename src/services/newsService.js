import { ObjectId } from "mongodb";

export async function createNews(collection, newsData) {
    return await collection.insertOne(newsData);
}

export async function findNewsById(collection, id) {
    return await collection.findOne({ _id: new ObjectId(id) });
}

export async function findAllNews(collection){
    return await collection.find().toArray();
}

export async function updateNewsById(collection, id, data){
    return await collection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        { $set: { title: data.title, description: data.description } },
        { returnDocument: 'after' }
    );
}

export async function deleteNewsById(collection, id){
    try {
        await collection.deleteOne({_id: new ObjectId(id)});
    } catch(err){
        throw new Error(err.message);
    }
}