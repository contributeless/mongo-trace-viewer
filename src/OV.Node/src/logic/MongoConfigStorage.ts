import { MongoConfig } from "../models/MongoConfig";
import fs from 'fs';
import util  from 'util';
import { writeFileAsyncRecursive } from "../utils/Utils";
import path from "path";

class MongoConfigStorage {
    private static readonly pathToConfig = path.join(process.cwd(), "cfg/mongoConfig.json");
    private getConnectionStringFromEnv(): string | null {
        return process.env.MONGO_CONNECTION_STRING || null;
    }
    
    async save(cfg: MongoConfig): Promise<void> {
        if(this.getConnectionStringFromEnv()){
            return;
        }
        await writeFileAsyncRecursive(MongoConfigStorage.pathToConfig, JSON.stringify(cfg));
    }

    async get() : Promise<MongoConfig> {
        const envConnectionString = this.getConnectionStringFromEnv();

        if(envConnectionString){
            return {
                connectionString: envConnectionString,
                isConnectionStringEditLocked: true
            }
        }

        try{
            const readFile = util.promisify(fs.readFile);
            const result = await readFile(MongoConfigStorage.pathToConfig);
            const str = result.toString('utf8');
            return {
                ...JSON.parse(str),
                isConnectionStringEditLocked: false
            };
        }
        catch{
            return {
                connectionString: "",
                isConnectionStringEditLocked: false
            };
        }
    }
}

export default new MongoConfigStorage();