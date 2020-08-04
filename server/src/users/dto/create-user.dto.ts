import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userRole: string;

  @IsString()
  @IsOptional()
  company: Schema.Types.ObjectId;
}
