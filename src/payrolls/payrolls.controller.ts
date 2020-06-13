/* eslint-disable no-empty-function */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Controller('payrolls')
export class PayrollsController {
  constructor(private readonly payrollService: PayrollsService) {}

  @Get()
  async getPayrolls() {
    return this.payrollService.getPayrolls();
  }

  @Post()
  async createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.createPayroll(createPayrollDto);
  }
}
