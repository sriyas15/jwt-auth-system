import express from 'express'
import { getUserProfile, login, logout, refreshAccessToken, registerUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout",logout);

router.get("/profile",protect,getUserProfile);

export default router
