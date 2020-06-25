"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monggose = require("mongoose");
exports.PayrollsSchema = new monggose.Schema({
    employeeId: String,
    period: String,
    date: String,
    benefitSalary: Object,
    cutSalary: Object
});
//# sourceMappingURL=payrolls.interface.js.map