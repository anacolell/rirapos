import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Sale from "./models/Sale";
import { config } from "dotenv";
import cors from "cors";

config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl =
  process.env.MONGO_URL !== undefined ? process.env.MONGO_URL : "";

app.get("/sales", async (req: Request, res: Response) => {
  const sales = await Sale.find().sort({ date: -1 });
  res.json(sales);
  return sales;
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

// app.put("/sales/:saleId", async (req: Request, res: Response) => {
//   try {
//     const saleId = req.params.saleId;
//     const { _id, ...updateData } = req.body;

//     const updatedSale = await Sale.findByIdAndUpdate(saleId, updateData, {
//       new: true,
//     });
//     if (!updatedSale) {
//       return res.status(404).json({ error: "Sale not found" });
//     }

//     res.json(updatedSale);
//   } catch (error) {
//     console.error("Error updating sale:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.patch("/sales/:saleId", async (req: Request, res: Response) => {
//   try {
//     const saleId = req.params.saleId;
//     console.log("saleId", saleId);

//     const { _id, ...updateData } = req.body;
//     console.log("_id", _id, "updateData", updateData);

//     if (!mongoose.Types.ObjectId.isValid(saleId)) {
//       return res.status(400).json({ error: "Invalid sale ID" });
//     }

//     const updatedSale = await Sale.findOneAndUpdate(
//       { _id: saleId },
//       updateData,
//       { new: true }
//     );

//     console.log("updatedSale", updatedSale);

//     if (!updatedSale) {
//       console.warn("Sale not found for ID:", saleId);
//       return res.status(404).json({ error: "Sale not found" });
//     }

//     res.json(updatedSale);
//   } catch (error) {
//     console.error("Error updating sale:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.put("/sales/:saleId", async (req: Request, res: Response) => {
  try {
    const saleId = req.params.saleId;

    if (!mongoose.Types.ObjectId.isValid(saleId)) {
      return res.status(400).json({ error: "Invalid sale ID" });
    }

    const { _id, ...updateData } = req.body;

    const updatedSale = await Sale.findByIdAndUpdate(
      saleId,
      { $set: updateData },
      { new: true }
    );
    console.log("updatedSale server", updatedSale);
    if (!updatedSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error("Error updating sale:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose.connect(mongoUrl).then(() => {
  console.log(`listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
