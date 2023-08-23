import { app } from "./app.js";
import { connectDb } from "./database/database.js";

//connecting Database
connectDb();

app.listen(process.env.PORT, () => {
  console.log("Server is Up and Running");
});
