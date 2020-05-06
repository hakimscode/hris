import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  Delete
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(@Res() res) {
    const companies = await this.companiesService.getCompanies();
    return res.status(HttpStatus.OK).json(companies);
  }

  @Post()
  async addCompanies(@Res() res, @Body() createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companiesService.addCompany(createCompanyDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Company has been submitted successfully',
      company: newCompany
    });
  }

  @Get(':companyId')
  async getCompany(@Res() res, @Param('companyId') companyId) {
    const company = await this.companiesService.getCompany(companyId);
    if (!company) {
      throw new NotFoundException('Company does not exist');
    }
    return res.status(HttpStatus.OK).json(company);
  }

  @Patch(':companyId')
  async updateCompany(
    @Res() res,
    @Param('companyId') companyId,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    const updatedCompany = await this.companiesService.updateCompany(
      companyId,
      updateCompanyDto
    );
    if (!updatedCompany) {
      throw new NotFoundException('Company does not exist');
    }
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Company has been updated successfully',
      company: updatedCompany
    });
  }

  @Delete(':companyId')
  async deleteCompany(@Res() res, @Param('companyId') companyId) {
    const deletedCompany = await this.companiesService.deleteCompany(companyId);
    if (!deletedCompany) {
      throw new NotFoundException('Company does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Company has been deleted successfully',
      company: deletedCompany
    });
  }
}
