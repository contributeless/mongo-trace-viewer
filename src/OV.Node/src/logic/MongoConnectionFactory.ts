import { MongoClient } from "mongodb";

class MongoConnectionFactory {

    public isInitialized(): boolean {
        return true;
    }

    public async getConnection(): Promise<MongoClient> {
        const uri = "mongodb://localhost:27017/";

        const client = new MongoClient(uri);

        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");

        return client;
    }
}

export default new MongoConnectionFactory();