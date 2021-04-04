import { MongoConfig } from "../models/MongoConfig";
import fs from 'fs';
import util  from 'util';
import { writeFileAsyncRecursive } from "../utils/Utils";
import path from "path";

class MongoConfigStorage {
    private static readonly pathToConfig = path.join(process.cwd(), "cfg/mongoConfig.json");
    async save(cfg: MongoConfig): Promise<void> {
        await writeFileAsyncRecursive(MongoConfigStorage.pathToConfig, JSON.stringify(cfg));
    }

    async get() : Promise<MongoConfig> {
        try{
            const readFile = util.promisify(fs.readFile);
            const result = await readFile(MongoConfigStorage.pathToConfig);
            const str = result.toString('utf8');
            return JSON.parse(str);
        }
        catch{
            return {
                connectionString: ""
            };
        }
    }
}

export default new MongoConfigStorage();