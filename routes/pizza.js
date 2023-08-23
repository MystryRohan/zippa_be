import express from "express";
import {
  addPizza,
  checkoutCart,
  getPizzas,
  deleteOne,
} from "../controllers/pizza.js";
import { isAuthenticated } from "../utils/features.js";

const pizzaRouter = express.Router();

pizzaRouter.post("/addpizza/:id", isAuthenticated, addPizza);
pizzaRouter.get("/checkoutCart", isAuthenticated, checkoutCart);
// pizzaRouter.get("/cart", isAuthenticated, getCartPizzas);
pizzaRouter.get("/deleteOne/:id", isAuthenticated, deleteOne);
pizzaRouter.get("/pizzas", getPizzas);

export default pizzaRouter;
