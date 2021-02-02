import { Response } from "express";
import { MongoClient } from "mongodb";

class ResponseUtils {
    private static readonly mongoConnectionKey = "mongoConnection";

    public setMongoConnection(res: Response, mongoClient: MongoClient){
        res.locals[ResponseUtils.mongoConnectionKey] = mongoClient;
    }
    
    public getMongoConnection(res: Response): MongoClient{
        return res.locals[ResponseUtils.mongoConnectionKey];
    }
}

export default new ResponseUtils();