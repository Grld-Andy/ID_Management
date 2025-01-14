import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  request: {
    type: String,
  },
  total: { type: Number },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
