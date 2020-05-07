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
  Delete,
  UseGuards
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
  async getCompanies(@Res() res) {
    const companies = await this.companiesService.getCompanies();
    return res.status(HttpStatus.OK).json(companies);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addCompanies(@Res() res, @Body() createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companiesService.addCompany(createCompanyDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Company has been submitted successfully',
      company: newCompany
    });
  }

  @Get(':companyId')
  @UseGuards(AuthGuard('jwt'))
  async getCompany(@Res() res, @Param('companyId') companyId) {
    const company = await this.companiesService.getCompany(companyId);
    if (!company) {
      throw new NotFoundException('Company does not exist');
    }
    return res.status(HttpStatus.OK).json(company);
  }

  @Patch(':companyId')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
