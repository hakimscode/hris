/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPassword } from '../shared/utils/hash.util';
import { User } from '../users/interfaces/user.interface';
import { ResponseDto } from '../shared/dto/response.dto';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private readonly EmployeeModel: Model<Employee>,
    @InjectModel('User') private readonly UserModel: Model<User>
  ) {}

  async getEmployees(user: any): Promise<ResponseDto> {
    const { company } = user;
    const qryCompany = company ? { company } : null;
    const employees: Employee[] = await this.EmployeeModel.find(qryCompany)
      .populate('company', 'name')
      .exec();
    if (!employees.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Employee does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }
    return new ResponseDto(HttpStatus.OK, 'Employees Found', employees);
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<ResponseDto> {
    const { username, password } = createEmployeeDto;
    const newUser = new this.UserModel({
      username,
      password: await HashPassword(password),
      userRole: 'Employee'
    });
    await newUser.save();

    const userId = newUser.id;

    const {
      company,
      phoneNumber,
      email,
      department,
      role,
      primarySalary,
      dailyAllowance,
      ...profile
    } = createEmployeeDto;

    const contact = { phoneNumber, email };
    const position = { department, role };
    const salary = { primarySalary, dailyAllowance };

    const newEmployee: Employee = new this.EmployeeModel({
      userId,
      company,
      profile,
      contact,
      position,
      salary
    });

    await newEmployee.save();

    return new ResponseDto(
      HttpStatus.CREATED,
      'Employee has been submitted successfully'
    );
  }

  async getEmployee(employeeId: string): Promise<ResponseDto> {
    const employee: Employee = await this.EmployeeModel.findById(employeeId)
      .populate('company', 'name')
      .exec();

    if (!employee) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Employee does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Employee found', employee);
  }

  async updateEmployee(
    employeeId: string,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<ResponseDto> {
    const {
      company,
      phoneNumber,
      email,
      department,
      role,
      primarySalary,
      dailyAllowance,
      ...profile
    } = updateEmployeeDto;

    const contact = { phoneNumber, email };
    const position = { department, role };
    const salary = { primarySalary, dailyAllowance };

    const updatedEmployee: Employee = await this.EmployeeModel.findByIdAndUpdate(
      employeeId,
      {
        company,
        profile,
        contact,
        position,
        salary
      },
      { new: true }
    );

    if (!updatedEmployee) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Employee does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.ACCEPTED,
      'Employee has been updated successfully',
      updatedEmployee
    );
  }

  async deleteEmployee(employeeId: string): Promise<ResponseDto> {
    const deletedEmployee = await this.EmployeeModel.findByIdAndRemove(
      employeeId
    );

    if (!deletedEmployee) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Employee does not exist'
      );
      throw new HttpException(response, response.statusCode);
    } else {
      await this.UserModel.findByIdAndRemove(deletedEmployee.userId);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Employee has been deleted successfully'
    );
  }
}
