import { Document } from 'mongoose';
import { SalaryComponentEnum } from '../../shared/enums';

export interface SalaryComponent extends Document {
  componentName: string;
  componentType: string;
  amount: number;
  decimalUnit: boolean;
  isAdders: boolean;
}
