import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    getEmployees(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    getEmployee(employeeId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
    updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    deleteEmployee(employeeId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
