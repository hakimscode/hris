import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  username: string;
  password: string;
  role: string;
}
