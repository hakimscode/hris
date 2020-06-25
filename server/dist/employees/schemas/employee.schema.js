"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.EmployeeSchema = new mongoose.Schema({
    userId: String,
    companyId: String,
    profile: Object,
    contact: Object,
    position: Object,
    salary: Object
});
//# sourceMappingURL=employee.schema.js.map