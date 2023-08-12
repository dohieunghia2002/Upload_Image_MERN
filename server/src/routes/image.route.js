import express from 'express';
import imageController from '../controllers/image.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();

router.delete('/:id', middlewareController.verifyToken, imageController.deleteImage);

router.post('/upload', middlewareController.verifyToken, imageController.uploadImg);

router.patch('/avatar/change', imageController.changeAvatar);

router.get('/', middlewareController.verifyToken, imageController.imagesAll);

export default router;