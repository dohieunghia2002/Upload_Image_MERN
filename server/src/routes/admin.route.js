import express from 'express';
import userController from '../controllers/user.controller.js';
import middleware from '../controllers/middleware.controller.js';

const router = express.Router();

router.get('/user/all', middleware.verifyToken, userController.getAllUsers);


export default router;