import { MongoConfig } from "../models/MongoConfig";
import fs from 'fs';
import util  from 'util';
import { writeFileAsyncRecursive } from "../utils/Utils";
import { json } from "express";

class MongoConfigStorage {
    private static readonly pathToConfig = "./cfg/mongoConfig.json";
    async save(cfg: MongoConfig): Promise<void> {
        await writeFileAsyncRecursive(MongoConfigStorage.pathToConfig, JSON.stringify(cfg), 'utf8');
    }

    async get() : Promise<MongoConfig> {
        const readFile = util.promisify(fs.readFile);
        const result = await readFile(MongoConfigStorage.pathToConfig);
        const str = result.toString('utf8')

        return JSON.parse(str);
    }
}

export default new MongoConfigStorage();