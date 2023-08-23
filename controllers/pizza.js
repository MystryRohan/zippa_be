import { Order } from "../models/order.js";
import { Pizza } from "../models/pizza.js";

export const addPizza = async (req, res, id) => {
  const { name: pizzaName, price, qty } = req.body.currPizza;
  // console.log(req.body.currPizza);

  let user = req.user;

  const hasPlacedItems = await Order.findOne({ user: user._id });
  //   console.log(hasPlacedItems);
  if (!hasPlacedItems) {
    await Order.create({
      user: user._id,
      name: new Map([[pizzaName, 1]]),
      price: price * qty,
      qty,
    });
    return res.json({ success: true, message: "Added To Cart" });
  }
  if (hasPlacedItems.name.has(pizzaName)) {
    hasPlacedItems.name.set(pizzaName, hasPlacedItems.name.get(pizzaName) + 1);
  } else {
    hasPlacedItems.name.set(pizzaName, 1);
  }
  hasPlacedItems.price += price * qty;
  hasPlacedItems.qty += qty;
  await hasPlacedItems.save();

  res.json({ success: true, message: "Added to Cart" });
};

export const checkoutCart = async (req, res) => {
  const message = await Order.findOne({ user: req.user });

  if (!message)
    return res
      .status(401)
      .json({ success: false, message: "Add Some Pizzas First" });

  res.status(201).json({
    success: true,
    message: message.name,
  });
  await Order.deleteOne({ user: req.user });
};

export const getPizzas = async (req, res) => {
  const data = await Pizza.find();

  res.status(201).json({ success: true, message: data });
};

export const getCartPizzas = async (req, res) => {
  const message = await Order.findOne({ user: req.user });

  if (!message)
    return res
      .status(401)
      .json({ success: false, message: "Add Some Pizzas First" });

  res.status(201).json({
    success: true,
    message: message,
  });
};
export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const message = await Order.findOne({ user: req.user });
  // console.log(message);
  if (!message)
    return res
      .status(401)
      .json({ success: false, message: "Add Some Pizzas First" });

  message.name.set(id, message.name.get(id) - 1);
  message.qty -= 1;
  message.price -= 299;

  if (message.name.get(id) === 0) {
    message.name.delete(id);
  }
  await message.save();
  if (message.name.size === 0) {
    await Order.deleteOne({ user: req.user._id });
  }
  // const check = await Order.findOne({ user: req.user });
  // console.log("check", check);
  res.status(201).json({
    success: true,
    message: message,
  });
};
