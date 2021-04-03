import { ConfigStatusResponse } from "../models/ConfigStatusResponse";
import { MongoConfig } from "../models/MongoConfig";
import { HttpUtility } from "./HttpUtility";

export class ConfigService {
    public static getConfigStatus(): Promise<ConfigStatusResponse>{
        return HttpUtility.get(HttpUtility.makeUrl("config/status"));
    }

    public static saveConfig(model: MongoConfig): Promise<ConfigStatusResponse>{
        return HttpUtility.post(HttpUtility.makeUrl("config/save"), model);
    }
}