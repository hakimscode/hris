import { Document } from 'mongoose';

export interface Payroll extends Document {
  employeeId: String;
  period: String;
  date: String;
  benefitSalary: [
    {
      name: string;
      amount: number;
    }
  ];
  cutSalary: [
    {
      name: string;
      amount: number;
    }
  ];
}
