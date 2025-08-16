"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const ObjectId = mongoose.Types.ObjectId;
const WineSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
});
const WineModel = mongoose_1.default.model("Wine", WineSchema);
exports.default = WineModel;
