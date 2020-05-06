import { Document } from 'mongoose';

export interface Company extends Document {
  readonly name: string;
  readonly field: string;
  readonly address: string;
}
