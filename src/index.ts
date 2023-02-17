// Modules
import dbConnect from "./database/connection";
import express, { Express } from "express";
import appRoutes from "./routes/app.router";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.APPLICATION_PORT;
const app: Express = express();
app.use(express.json());

app.use("/", appRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port} ....`);
});

dbConnect
  .connect()
  .then(() => {
    console.log("Database is connected successfully...");
  })
  .catch((error: Error) => {
    throw new Error(`Database connection has error: ${error}`);
  });

export default app;
