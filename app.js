import express from "express";
import userRouter from "./routes/user.js";
import pizzaRouter from "./routes/pizza.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

export const app = express();

config({ path: "./database/config.env" });

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
//using routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/pizza/", pizzaRouter);

app.get("/", (req, res) => {
  res.send("hello, World!");
});
