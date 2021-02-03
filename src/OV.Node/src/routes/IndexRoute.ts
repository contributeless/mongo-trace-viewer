import { Router } from 'express';
import IndexController from '../controllers/IndexController';
import Route from '../interfaces/Route';

class IndexRoute implements Route {
  public path = '/db';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
