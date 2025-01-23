import express from 'express';
import FilesController from '../controllers/filesController';

const router = express.Router();

router.get('/data', FilesController.getFiles);
router.get('/list', FilesController.listFiles);

export default router;
