"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
// const ObjectId = mongoose.Types.ObjectId;
var WineSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
});
var WineModel = mongoose_1.default.model("Wine", WineSchema);
exports.default = WineModel;
