import express from 'express';
import imageController from '../controllers/image.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();

router.get('/', middlewareController.verifyToken, imageController.imagesAll);

router.post('/upload', middlewareController.verifyToken, imageController.uploadImg);

router.patch('/avatar/change', imageController.changeAvatar);

export default router;