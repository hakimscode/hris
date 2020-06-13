import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  dateOfAttendance: string;

  @IsString()
  @IsNotEmpty()
  timeOut: string;

  @IsString()
  @IsOptional()
  note: string;
}
