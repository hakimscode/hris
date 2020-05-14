import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getEmployees() {
    return this.employeesService.getEmployees();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get(':employeeId')
  @UseGuards(AuthGuard('jwt'))
  async getEmployee(@Param('employeeId') employeeId: string) {
    return this.employeesService.getEmployee(employeeId);
  }

  @Patch(':employeeId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(202)
  async updateEmployee(
    @Param('employeeId') employeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete(':employeeId')
  @UseGuards(AuthGuard('jwt'))
  async deleteEmployee(@Param('employeeId') employeeId: string) {
    return this.employeesService.deleteEmployee(employeeId);
  }
}
