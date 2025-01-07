import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

export default router;
