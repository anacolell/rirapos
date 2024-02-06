"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const SaleModel = mongoose_1.default.model("Sale", SaleSchema);
exports.default = SaleModel;
