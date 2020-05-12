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
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalaryComponentsService } from './salary-components.service';
import { CreateSalaryComponentDto } from './dtos/create-salary-component-dto';
import { UpdateSalaryComponentDto } from './dtos/update-salary-component-dto';

@Controller('salary-components')
export class SalaryComponentsController {
  constructor(
    private readonly SalaryComponentsServices: SalaryComponentsService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getSalaryComponents() {
    return this.SalaryComponentsServices.getSalaryComponents();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSalaryComponent(
    @Body() createSalaryComponentDto: CreateSalaryComponentDto
  ) {
    return this.SalaryComponentsServices.createSalaryComponent(
      createSalaryComponentDto
    );
  }

  @Get(':SalaryComponentId')
  @UseGuards(AuthGuard('jwt'))
  async getSalaryComponent(
    @Param('SalaryComponentId') SalaryComponentId: string
  ) {
    return this.SalaryComponentsServices.getSalaryComponent(SalaryComponentId);
  }

  @Patch(':SalaryComponentId')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async deleteSalaryComponent(
    @Param('SalaryComponentId') SalaryComponentId: string
  ) {
    return this.SalaryComponentsServices.deleteSalaryComponent(
      SalaryComponentId
    );
  }
}
