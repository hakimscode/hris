import { Document } from 'mongoose';

export interface Employee extends Document {
  userId: string;
  companyId: string;
  profile: {
    idCardNumber: string;
    name: string;
    address: string;
    gender: string;
    age: number;
    placeOfBirth: string;
    dateOfBirth: string;
    maritalStatus: string;
  };
  contact: {
    phoneNumber: string;
    email: string;
  };
  position: {
    department: string;
    role: string;
  };
  salary: {
    primarySalary: number;
    dailyAllowance: number;
  };
  login: {
    username: string;
    password: string;
  };
}
