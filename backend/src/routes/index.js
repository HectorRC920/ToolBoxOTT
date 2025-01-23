import express from 'express';
import filesRouter from './filesRouter.js';

export default class RouterAPI {

  constructor(app ) {
    this.app = app;
    this.router = express.Router();
    this.app.use('/api/v1', this.router);
    this.router.use('/files', filesRouter);
  }
}
