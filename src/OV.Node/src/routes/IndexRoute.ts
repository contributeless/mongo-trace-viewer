import { Router } from 'express';
import IndexController from '../controllers/IndexController';
import Route from '../interfaces/Route';

class IndexRoute implements Route {
  public path = '/db';
  public prefillPath = '/db/prefill';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.indexController.index);
    this.router.get(`${this.prefillPath}`, this.indexController.filtersPrefill);
  }
}

export default IndexRoute;
