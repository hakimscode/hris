"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hash_util_1 = require("../shared/utils/hash.util");
const response_dto_1 = require("../shared/dto/response.dto");
let EmployeesService = class EmployeesService {
    constructor(EmployeeModel, UserModel) {
        this.EmployeeModel = EmployeeModel;
        this.UserModel = UserModel;
    }
    async getEmployees() {
        const employees = await this.EmployeeModel.find().exec();
        if (!employees.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Employee does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Employees Found', employees);
    }
    async createEmployee(createEmployeeDto) {
        const { username, password } = createEmployeeDto;
        const newUser = new this.UserModel({
            username,
            password: await hash_util_1.HashPassword(password),
            userRole: 'Employee'
        });
        await newUser.save();
        const userId = newUser.id;
        const { companyId, phoneNumber, email, department, role, primarySalary, dailyAllowance } = createEmployeeDto, profile = __rest(createEmployeeDto, ["companyId", "phoneNumber", "email", "department", "role", "primarySalary", "dailyAllowance"]);
        const contact = { phoneNumber, email };
        const position = { department, role };
        const salary = { primarySalary, dailyAllowance };
        const newEmployee = new this.EmployeeModel({
            userId,
            companyId,
            profile,
            contact,
            position,
            salary
        });
        await newEmployee.save();
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Employee has been submitted successfully', newEmployee);
    }
    async getEmployee(employeeId) {
        const employee = await this.EmployeeModel.findById(employeeId).exec();
        if (!employee) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Employee does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Employee found', employee);
    }
    async updateEmployee(employeeId, updateEmployeeDto) {
        const { companyId, phoneNumber, email, department, role, primarySalary, dailyAllowance } = updateEmployeeDto, profile = __rest(updateEmployeeDto, ["companyId", "phoneNumber", "email", "department", "role", "primarySalary", "dailyAllowance"]);
        const contact = { phoneNumber, email };
        const position = { department, role };
        const salary = { primarySalary, dailyAllowance };
        const updatedEmployee = await this.EmployeeModel.findByIdAndUpdate(employeeId, {
            companyId,
            profile,
            contact,
            position,
            salary
        }, { new: true });
        if (!updatedEmployee) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Employee does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.ACCEPTED, 'Employee has been updated successfully', updatedEmployee);
    }
    async deleteEmployee(employeeId) {
        const deletedEmployee = await this.EmployeeModel.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Employee does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        else {
            await this.UserModel.findByIdAndRemove(deletedEmployee.userId);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Employee has been deleted successfully');
    }
};
EmployeesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Employee')),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map