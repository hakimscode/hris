import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  company: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  idCardNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  maritalStatus: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @IsNotEmpty()
  primarySalary: number;

  @IsNumber()
  @IsNotEmpty()
  dailyAllowance: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
