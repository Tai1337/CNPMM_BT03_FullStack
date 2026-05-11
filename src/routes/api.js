import express from 'express';
import * as userController from '../controllers/userController.js';
import * as homeController from '../controllers/homeController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.post('/forgot-password', userController.handleForgotPassword);
router.post('/reset-password', userController.handleResetPassword);

router.get('/home', verifyToken, homeController.getHome);
router.get('/users', verifyToken, userController.handleGetAllUsers);

export default router;
