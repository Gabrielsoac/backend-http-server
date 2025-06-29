import { ObjectId } from "mongodb";

export async function createNews(collection, newsData) {
    try {
        return await collection.insertOne(newsData);
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function findNewsById(collection, id) {
    try {
        return await collection.findOne({ _id: new ObjectId(String(id)) });
    } catch (err){
        throw new Error(err.message);
    }
}

export async function findAllNews(collection){
    try {
        return await collection.find().toArray();
    } catch (err){
        throw Error(err.message);
    }
}

export async function updateNewsById(collection, id, data){
    try {
        return await collection.findOneAndUpdate(
            {_id: new ObjectId(String(id))},
            { $set: { title: data.title, description: data.description } },
            { returnDocument: 'after' }
        );
    } catch(err){
        throw new Error(err.message);
    }

}

export async function deleteNewsById(collection, id){
    try {
        await collection.deleteOne({_id: new ObjectId(String(id))});
    } catch(err){
        throw new Error(err.message);
    }
}