import express, { Application } from 'express';
import filesRouter from './filesRouter';

export default class RouterAPI {
  app: Application;
  router: express.Router;

  constructor(app: Application) {
    this.app = app;
    this.router = express.Router();
    this.app.use('/api/v1', this.router);
    this.router.use('/files', filesRouter);
  }
}
