import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});

export const User = mongoose.model("user", userSchema);
