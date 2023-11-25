"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
// const ObjectId = mongoose.Types.ObjectId;
var SaleSchema = new Schema({
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
});
var SaleModel = mongoose_1.default.model("Sale", SaleSchema);
exports.default = SaleModel;
