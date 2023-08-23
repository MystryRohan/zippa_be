import mongoose from "mongoose";

export const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI, { dbName: "zippa" }).then(() => {
    console.log("Database Connected");
  });
};
