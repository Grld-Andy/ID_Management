import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  rooms: [
    {
      name: String,
      yards: Number,
      ratePerYard: Number,
      sewingCost: Number,
    },
  ],
  curtainRods: {
    quantity: Number,
    costPerRod: Number,
  },
  installation: {
    windows: Number,
    costPerWindow: Number,
    transport: Number,
  },
  total: { type: Number },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
