import { MongoClient } from "mongodb";
import MongoConfigStorage from "./MongoConfigStorage"
class MongoConnectionFactory {

    public async isInitialized(): Promise<boolean> {
        try{
            const client = await this.getConnection();

            await client.db("admin").command({ ping: 1 });

            return true;
        }
        catch{
            return false;
        }
    }

    public async getConnection(): Promise<MongoClient> {
        const config = await MongoConfigStorage.get();
        const uri = config.connectionString; //"mongodb://localhost:27017/";

        const client = new MongoClient(uri);

        await client.connect();

        return client;
    }
}

export default new MongoConnectionFactory();