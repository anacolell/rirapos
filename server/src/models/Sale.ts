import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const SaleSchema = new Schema({
  wineTastings: [{ price: Number, id: String, quantity: Number }],
  wines: [
    {
      id: String,
      title: String,
      img: String,
      year: String,
      price: Number,
      quantity: Number,
      isWineInBox: Boolean,
      wineType: String,
      date: Date,
    },
  ],
  total: Number,
  subtotal: Number,
  discount: Number,
  discountAmount: Number,
  discountDifference: Number,
  comment: String,
  date: Date,
  isBusiness: Boolean,
});

const SaleModel = mongoose.model("Sale", SaleSchema);

export default SaleModel;
