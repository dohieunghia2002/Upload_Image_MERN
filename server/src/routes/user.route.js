import express from 'express';
import userController from '../controllers/user.controller.js';
import cookieParser from 'cookie-parser';

const app = express();
const router = express.Router();
app.use(cookieParser());

router.post('/auth/register', userController.register);

router.post('/auth/login', userController.login);

router.post('/auth/refresh', userController.requestRefreshToken);

router.post('/logout', userController.userLogout);

router.get('/test', userController.test);


export default router;