import express from 'express';
import FilesController from '../controllers/filesController';

const router = express.Router();

router.get('/', FilesController.getFiles);

export default router;
