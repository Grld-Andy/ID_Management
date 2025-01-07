import express from "express";
import userRouter from "./userRoute";
import authRouter from "./authRoute";
import orderRouter from "./orderRoute";
import clientRouter from "./clientRoute";
import stockRouter from "./stockRoute";
import paymentRouter from "./paymentRoute";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);
router.use("/clients", clientRouter);
router.use("/stocks", stockRouter);
router.use("/payments", paymentRouter);

export default router;
