import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCompanies() {
    return this.companiesService.getCompanies();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addCompanies(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.addCompany(createCompanyDto);
  }

  @Get(':companyId')
  @UseGuards(AuthGuard('jwt'))
  async getCompany(@Param('companyId') companyId: string) {
    return this.companiesService.getCompany(companyId);
  }

  @Patch(':companyId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(202)
  async updateCompany(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companiesService.updateCompany(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(AuthGuard('jwt'))
  async deleteCompany(@Param('companyId') companyId: string) {
    return this.companiesService.deleteCompany(companyId);
  }
}
