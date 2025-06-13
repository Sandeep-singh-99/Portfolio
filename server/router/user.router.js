import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkAuth, login } from '../controller/user.controller.js';

const router = express.Router();

router.route("/login").post(authMiddleware, login)

router.route("/check-auth").get(authMiddleware, checkAuth)

export default router;