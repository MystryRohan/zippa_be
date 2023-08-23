import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { createToken } from "../utils/features.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: false,
      message: "Register First",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(200).json({
      success: false,
      message: "Incorrect Username or Password!",
    });
  }
  createToken(req, res, user, 200, "Logged Successfully");
};

export const registerUser = async (req, res) => {
  const { email, name, password, address } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(200).json({
      success: false,
      message: "Email Already Registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ email, name, password: hashedPassword, address });

  createToken(req, res, user, 200, "Registered Successfully");
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("logged", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.MODE === "Dev" ? "lax" : "none",
      secure: process.env.MODE === "Dev" ? false : true,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
};

export const updateUser = async (req, res) => {
  const { name, address } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, address }
    );

    res.json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Update Failed",
    });
  }
};
export const getProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
