import * as mongoose from 'mongoose';

export const BonusSchema = new mongoose.Schema({
  bonusName: String,
  amount: Number,
  decimalUnit: Boolean
});
