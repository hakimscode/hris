import * as mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  dateOfAttendance: String,
  bodyOfAttendances: Array
});
