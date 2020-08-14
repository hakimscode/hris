import * as mongoose from 'mongoose';
import { SalaryComponentEnum } from '../../shared/enums';

export const SalaryComponentSchema = new mongoose.Schema({
  componentName: String,
  componentType: {
    type: String,
    enum: [
      SalaryComponentEnum.Allowance,
      SalaryComponentEnum.Bonus,
      SalaryComponentEnum.Deduction,
    ],
  },
  amount: Number,
  decimalUnit: Boolean,
  isAdders: Boolean,
});
