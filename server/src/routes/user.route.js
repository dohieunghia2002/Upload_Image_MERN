import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/auth/register', userController.register);

router.post('/auth/login', userController.login);

router.post('/auth/refresh', userController.requestRefreshToken);

router.post('/logout', userController.userLogout);


export default router;