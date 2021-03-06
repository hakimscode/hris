/* eslint-disable no-empty-function */
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Query
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { SalaryComponentsService } from './salary-components.service';
import { CreateSalaryComponentDto } from './dtos/create-salary-component-dto';
import { UpdateSalaryComponentDto } from './dtos/update-salary-component-dto';
import { FindSalaryComponentRequestDto } from './dtos/find-salary-component-request.dto';

@Controller('salary-components')
export class SalaryComponentsController {
  constructor(
    private readonly SalaryComponentsServices: SalaryComponentsService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'salaryComponent'
  })
  async getSalaryComponents(@Query() query: FindSalaryComponentRequestDto) {
    const componentType = query.componentType ? query.componentType : '';
    return this.SalaryComponentsServices.getSalaryComponents(componentType);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'salaryComponent'
  })
  async createSalaryComponent(
    @Body() createSalaryComponentDto: CreateSalaryComponentDto
  ) {
    return this.SalaryComponentsServices.createSalaryComponent(
      createSalaryComponentDto
    );
  }

  @Get(':SalaryComponentId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'salaryComponent'
  })
  async getSalaryComponent(
    @Param('SalaryComponentId') SalaryComponentId: string
  ) {
    return this.SalaryComponentsServices.getSalaryComponent(SalaryComponentId);
  }

  @Patch(':SalaryComponentId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'salaryComponent'
  })
  @HttpCode(202)
  async updateSalaryComponent(
    @Param('SalaryComponentId') SalaryComponentId: string,
    @Body() updateSalaryComponentDto: UpdateSalaryComponentDto
  ) {
    return this.SalaryComponentsServices.updateSalaryComponent(
      SalaryComponentId,
      updateSalaryComponentDto
    );
  }

  @Delete(':SalaryComponentId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'salaryComponent'
  })
  async deleteSalaryComponent(
    @Param('SalaryComponentId') SalaryComponentId: string
  ) {
    return this.SalaryComponentsServices.deleteSalaryComponent(
      SalaryComponentId
    );
  }
}
