import { Router } from 'express';
import ConfigController from '../controllers/ConfigController';
import Route from '../interfaces/Route';

class ConfigRoute implements Route {
  public savePath = '/config/save';
  public statusPath = '/config/status';
  public router = Router();
  public controller = new ConfigController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.savePath}`, this.controller.save);
    this.router.get(`${this.statusPath}`, this.controller.status);
  }
}

export default ConfigRoute;
