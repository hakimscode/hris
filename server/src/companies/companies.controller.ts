import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  Req
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'company'
  })
  async getCompanies(@Req() req: any) {
    return this.companiesService.getCompanies(req.user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'company'
  })
  async addCompanies(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.addCompany(createCompanyDto);
  }

  @Get(':companyId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'company'
  })
  async getCompany(@Param('companyId') companyId: string) {
    return this.companiesService.getCompany(companyId);
  }

  @Patch(':companyId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'company'
  })
  @HttpCode(202)
  async updateCompany(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companiesService.updateCompany(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'company'
  })
  async deleteCompany(@Param('companyId') companyId: string) {
    return this.companiesService.deleteCompany(companyId);
  }
}
