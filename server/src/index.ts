import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Sale from "./models/Sale";
import { config } from "dotenv";

config();
const PORT = 5000;
const app = express();

app.use(express.json());

app.post("/sales", async (req: Request, res: Response) => {
  const newSale = new Sale({
    title: req.body.title,
  });
  const createdSale = await newSale.save();
  res.json(createdSale);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
