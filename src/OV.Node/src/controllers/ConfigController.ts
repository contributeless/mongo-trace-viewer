import { NextFunction, Request, Response } from 'express';
import MongoConfigStorage from '../logic/MongoConfigStorage';
import { MongoConfig } from '../models/MongoConfig';

class ConfigController {
  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const configData: MongoConfig = req.body;
        
        await MongoConfigStorage.save(configData);
        res.json({});
    } catch (error) {
        next(error);
    }
  };

  public status = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = await MongoConfigStorage.get();
        
        res.json({
            isConfigured: !!config && !!config.connectionString
        });
    } catch (error) {
        next(error);
    }
  };
}

export default ConfigController;
