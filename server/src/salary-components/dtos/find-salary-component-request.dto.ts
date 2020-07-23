import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SalaryComponentEnum } from 'src/shared/enums';

export class FindSalaryComponentRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(SalaryComponentEnum)
  readonly componentType: string;
}
