import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  name: Map,
  price: Number,
  qty: Number,
});

export const Order = mongoose.model("orders", orderSchema);
