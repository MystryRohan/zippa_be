import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  qty: Number,
});

export const Pizza = mongoose.model("pizza", pizzaSchema);
