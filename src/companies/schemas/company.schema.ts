import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  name: String,
  field: String,
  address: String
});
