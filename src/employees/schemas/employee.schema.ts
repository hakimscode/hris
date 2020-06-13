import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  userId: String,
  companyId: String,
  profile: Object,
  contact: Object,
  position: Object,
  salary: Object
});
