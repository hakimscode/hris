import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  company: Schema.Types.ObjectId;

  @IsString()
  @IsOptional()
  idCardNumber: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  placeOfBirth: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  maritalStatus: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsNumber()
  @IsOptional()
  primarySalary: number;

  @IsNumber()
  @IsOptional()
  dailyAllowance: number;

  @IsString()
  @IsOptional()
  address: string;
}
