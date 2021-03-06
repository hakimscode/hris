/* eslint-disable no-empty-function */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req
} from '@nestjs/common';
import { UseRoles, ACGuard } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { PayrollsService } from './payrolls.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Controller('payrolls')
export class PayrollsController {
  constructor(private readonly payrollService: PayrollsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'payroll'
  })
  async getPayrolls(@Req() req: any) {
    return this.payrollService.getPayrolls(req.user);
  }

  @Get(':payrollId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'payroll'
  })
  async getPayroll(@Param('payrollId') payrollId: string) {
    return this.payrollService.getPayroll(payrollId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'payroll'
  })
  async createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.createPayroll(createPayrollDto);
  }
}
