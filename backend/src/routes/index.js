import express from 'express';
import filesRouter from './filesRouter.js';

/**
 * Class to configure and manage API routes for the application.
 */
export default class RouterAPI {
  
  /**
   * Constructor to initialize the RouterAPI class.
   * @param {Object} app - The Express application instance.
   */
  constructor(app) {
    this.app = app; // Reference to the Express app instance
    this.router = express.Router(); // Creating a new router instance
    
    // Registering the base route for API version 1
    this.app.use('/api/v1', this.router);

    // Mounting the filesRouter to handle '/files' endpoints under '/api/v1'
    this.router.use('/files', filesRouter);
  }
}
