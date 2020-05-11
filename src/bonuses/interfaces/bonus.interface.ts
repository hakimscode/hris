import { Document } from 'mongoose';

export interface Bonus extends Document {
  bonusName: string;
  amount: number;
  decimalUnit: boolean;
}
