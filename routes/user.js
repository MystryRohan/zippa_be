import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getProfile,
} from "../controllers/user.js";
import { getCartPizzas } from "../controllers/pizza.js";
import { isAuthenticated } from "../utils/features.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/updateDetails", isAuthenticated, updateUser);
userRouter.get("/me", isAuthenticated, getProfile);
userRouter.get("/cart", isAuthenticated, getCartPizzas);
userRouter.get("/logout", logoutUser);

export default userRouter;
