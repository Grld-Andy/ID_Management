import express from "express";
import {
  createStock,
  deleteStock,
  getAllStocks,
  getStock,
  updateStock,
} from "../controllers/stockController";

const router = express.Router();

router.route("/").post(createStock).get(getAllStocks);
router.route("/:id").get(getStock).patch(updateStock).delete(deleteStock);

export default router;
