import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  updatePassword,
} from "../controllers/authController";
import auth from "../middlewares/auth";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").post(auth, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/update-password").patch(auth, updatePassword);

export default router;
