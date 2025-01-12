import mongoose from "mongoose";
import validator from "validator";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide client name"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provdie client's phone number"],
    validate: function (value: string) {
      if (!validator.isNumeric(value)) {
        throw new Error("Please enter the correct phone number");
      }
    },
  },
  address: {
    type: String,
  },
  extraDetails: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
