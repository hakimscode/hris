import { Document, Schema } from 'mongoose';

export interface Payroll extends Document {
  employee: Schema.Types.ObjectId;
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
