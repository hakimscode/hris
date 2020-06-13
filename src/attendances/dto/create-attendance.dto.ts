import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  dateOfAttendance: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  timeIn: string;

  @IsString()
  @IsOptional()
  note: string;
}
