import express from "express";
import {
  createUser,
  getAllUsers,
  deleteMe,
  updateMe,
  recoverUser,
} from "../controllers/userController";
import auth from "../middlewares/auth";
import restrict from "../middlewares/restrict";

const router = express.Router();

router.route("/").post(createUser).get(auth, getAllUsers);
router.route("/delete-me").patch(auth, deleteMe);
router.route("/update-me").patch(auth, updateMe);
router.route("recover-user").patch(auth, restrict("admin"), recoverUser);

export default router;
