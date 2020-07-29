import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Schema } from 'mongoose';

export class CreatePayrollDto {
  @IsString()
  @IsNotEmpty()
  employee: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @IsNotEmpty()
  benefitSalary: Array<Object>;

  @IsArray()
  @IsNotEmpty()
  cutSalary: Array<Object>;
}
