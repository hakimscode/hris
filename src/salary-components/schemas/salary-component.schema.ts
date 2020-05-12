import * as mongoose from 'mongoose';

export const SalaryComponentSchema = new mongoose.Schema({
  componentName: String,
  componentType: String,
  amount: Number,
  decimalUnit: Boolean,
  isAdders: Boolean
});
