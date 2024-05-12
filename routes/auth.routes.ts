// auth.routes.ts
import express from 'express';
import AuthController from '../controllers/ auth.controller';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/reset-token', AuthController.generateResetToken);
router.post('/reset-password', AuthController.resetPassword);

export default router;
