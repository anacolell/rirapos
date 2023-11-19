import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const WineSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const WineModel = mongoose.model("Wine", WineSchema);

export default WineModel;
