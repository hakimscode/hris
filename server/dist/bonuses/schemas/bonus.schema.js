"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.BonusSchema = new mongoose.Schema({
    bonusName: String,
    amount: Number,
    decimalUnit: Boolean
});
//# sourceMappingURL=bonus.schema.js.map