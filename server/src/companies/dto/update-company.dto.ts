import { IsString, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly field: string;

  @IsString()
  @IsOptional()
  readonly address: string;
}
