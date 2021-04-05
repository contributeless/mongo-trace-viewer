import { NextFunction, Request, Response } from 'express';
import { ServerErrorModel } from '../Entities/ServerErrorModel';
import MongoConfigStorage from '../logic/MongoConfigStorage';
import MongoConnectionFactory from '../logic/MongoConnectionFactory';
import { MongoConfig } from '../models/MongoConfig';

class ConfigController {
  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const configData: MongoConfig = req.body;
        

        if(await MongoConnectionFactory.isConnectionStringValid(configData.connectionString)){
           await MongoConfigStorage.save(configData);
           res.json({
            isConfigured: await MongoConnectionFactory.isInitialized(),
            connectionString: configData?.connectionString
          });
        } else{
          res.status(400).json({
            errors: ["Invalid connection string or server is unreachable"]
          } as ServerErrorModel)
        }
    } catch (error) {
        next(error);
    }
  };

  public status = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = await MongoConfigStorage.get();
        
        res.json({
            isConfigured: await MongoConnectionFactory.isInitialized(),
            connectionString: config?.connectionString
        });
      } catch (error) {
      next(error);
    }
  };
}

export default ConfigController;
