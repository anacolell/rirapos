import mongoose from "mongoose";
import WineModel from "./Wine";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

// const SaleSchema = new Schema({
//   //   wines: [{ name: String, price: Number, quantity: Number }],
//   wines: [{ type: Schema.Types.ObjectId, ref: "Wine" }], // Reference to WineModel document
//   wineTastings: [{ type: Schema.Types.ObjectId, ref: "Winetasting" }], // Reference to WineModel document
//   totalPrice: Number,
//   subtotal: Number,
//   discount: Number,
//   discountAmount: Number,
//   discountDifference: Number,
//   comment: String,
//   date: Date,
// });

const SaleSchema = new Schema({
  title: String,
});

const SaleModel = mongoose.model("Sale", SaleSchema);

export default SaleModel;
