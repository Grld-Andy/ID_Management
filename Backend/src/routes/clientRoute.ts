import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const router = express.Router();

router.route("/").post(createClient).get(getClients);
router.route("/:id").get(getClientById).put(updateClient).delete(deleteClient);

export default router;
