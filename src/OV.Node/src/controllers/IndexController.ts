import { NextFunction, Request, Response } from 'express';
import ResponseUtils from '../utils/ResponseUtils';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mongoClient = ResponseUtils.getMongoConnection(res);

      const result = await mongoClient.db("local").collection('oplog.rs').find({}, {
        limit:10
      }).toArray();
      res.json(result);
      
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
