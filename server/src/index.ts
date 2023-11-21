import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Sale from "./models/Sale";
import { config } from "dotenv";
import cors from "cors";

config();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/sales", async (req: Request, res: Response) => {
  const sales = await Sale.find().sort({ date: -1 });
  res.json(sales);
});

app.post("/sales", async (req: Request, res: Response) => {
  console.log("Received request body:", req.body);

  const newSale = new Sale(req.body);
  try {
    const createdSale = await newSale.save();
    res.json(createdSale);
  } catch (error) {
    console.error("Error saving sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/sales/:saleId", async (req: Request, res: Response) => {
  console.log("PARAMS", req.params);
  try {
    const saleId = req.params.saleId;
    const sale = await Sale.findByIdAndDelete(saleId);
    res.json(sale);
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
