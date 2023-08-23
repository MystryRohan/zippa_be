import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const createToken = (req, res, user, statusCode, msg) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("logged", token, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
      // sameSite: "none",
      // secure: true,
      sameSite: process.env.MODE === "Dev" ? "lax" : "none",
      secure: process.env.MODE === "Dev" ? false : true,
    })
    .json({
      success: true,
      message: msg,
    });
  req.user = user;
};
export const isAuthenticated = async (req, res, next) => {
  const { logged: token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Login First" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
