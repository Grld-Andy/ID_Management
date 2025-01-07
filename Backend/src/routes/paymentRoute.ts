import express from "express";
import {
  getAllPayments,
  getPaymentForOrder,
  getPaymentReport,
  makePayment,
} from "../controllers/paymentController";

const router = express.Router();

router.route("/").post(makePayment).get(getAllPayments);
router.route("/:id").get(getPaymentForOrder);
router.route("/payment-report").get(getPaymentReport);

export default router;
