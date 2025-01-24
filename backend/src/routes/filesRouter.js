import express from 'express'; 
import FilesController from '../controllers/filesController.js'; 
// Creating a new router instance
const router = express.Router();

/**
 * GET /data
 * Route to retrieve file data.
 * Handled by the `getFiles` method of FilesController.
 */
router.get('/data', FilesController.getFiles);

/**
 * GET /list
 * Route to retrieve a list of files.
 * Handled by the `listFiles` method of FilesController.
 */
router.get('/list', FilesController.listFiles);

// Exporting the router instance for use in the main application
export default router;
