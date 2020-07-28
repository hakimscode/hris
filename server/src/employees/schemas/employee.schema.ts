import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  userId: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  profile: Object,
  contact: Object,
  position: Object,
  salary: Object
});
