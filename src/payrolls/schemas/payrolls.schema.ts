import * as monggose from 'mongoose';

export const PayrollsSchema = new monggose.Schema({
  employeeId: String,
  period: String,
  date: String,
  benefitSalary: Object,
  cutSalary: Object
});
