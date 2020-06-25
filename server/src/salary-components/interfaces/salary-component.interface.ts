import { Document } from 'mongoose';

export interface SalaryComponent extends Document {
  componentName: string;
  componentType: string;
  amount: number;
  decimalUnit: boolean;
  isAdders: boolean;
}
