import { IsString, IsOptional } from 'class-validator';

export class FindSalaryComponentRequestDto {
  @IsString()
  @IsOptional()
  readonly componentType: string;
}
