"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.SalaryComponentSchema = new mongoose.Schema({
    componentName: String,
    componentType: String,
    amount: Number,
    decimalUnit: Boolean,
    isAdders: Boolean
});
//# sourceMappingURL=salary-component.schema.js.map