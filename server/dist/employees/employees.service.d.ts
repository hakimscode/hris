import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { ResponseDto } from '../shared/dto/response.dto';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesService {
    private readonly EmployeeModel;
    private readonly UserModel;
    constructor(EmployeeModel: Model<Employee>, UserModel: Model<User>);
    getEmployees(): Promise<ResponseDto>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<ResponseDto>;
    getEmployee(employeeId: string): Promise<ResponseDto>;
    updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto>;
    deleteEmployee(employeeId: string): Promise<ResponseDto>;
}
