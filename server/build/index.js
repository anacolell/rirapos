"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Sale_1 = __importDefault(require("./models/Sale"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const mongoUrl = process.env.MONGO_URL !== undefined ? process.env.MONGO_URL : "";
app.get("/sales", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield Sale_1.default.find().sort({ date: -1 });
    res.json(sales);
    return sales;
}));
app.post("/sales", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request body:", req.body);
    const newSale = new Sale_1.default(req.body);
    try {
        const createdSale = yield newSale.save();
        res.json(createdSale);
    }
    catch (error) {
        console.error("Error saving sale:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.delete("/sales/:saleId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PARAMS", req.params);
    try {
        const saleId = req.params.saleId;
        const sale = yield Sale_1.default.findByIdAndDelete(saleId);
        res.json(sale);
    }
    catch (error) {
        console.error("Error deleting sale:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.put("/sales/:saleId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleId = req.params.saleId;
        const updatedSale = yield Sale_1.default.findByIdAndUpdate(saleId, req.body, {
            new: true,
        });
        if (!updatedSale) {
            return res.status(404).json({ error: "Sale not found" });
        }
        res.json(updatedSale);
    }
    catch (error) {
        console.error("Error updating sale:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
mongoose_1.default.connect(mongoUrl).then(() => {
    console.log(`listening on port ${process.env.PORT}`);
    app.listen(process.env.PORT);
});
