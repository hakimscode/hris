import { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  userRole: string;
  company: Schema.Types.ObjectId;
}
