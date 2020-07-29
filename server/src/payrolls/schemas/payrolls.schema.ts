import * as monggose from 'mongoose';

export const PayrollsSchema = new monggose.Schema({
  employee: { type: monggose.Schema.Types.ObjectId, ref: 'Employee' },
  period: String,
  date: String,
  benefitSalary: Object,
  cutSalary: Object
});
