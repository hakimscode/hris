"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.AttendanceSchema = new mongoose.Schema({
    dateOfAttendance: String,
    bodyOfAttendances: Array
});
//# sourceMappingURL=attendance.schema.js.map