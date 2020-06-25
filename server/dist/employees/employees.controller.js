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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const nest_access_control_1 = require("nest-access-control");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async getEmployees() {
        return this.employeesService.getEmployees();
    }
    async createEmployee(createEmployeeDto) {
        return this.employeesService.createEmployee(createEmployeeDto);
    }
    async getEmployee(employeeId) {
        return this.employeesService.getEmployee(employeeId);
    }
    async updateEmployee(employeeId, updateEmployeeDto) {
        return this.employeesService.updateEmployee(employeeId, updateEmployeeDto);
    }
    async deleteEmployee(employeeId) {
        return this.employeesService.deleteEmployee(employeeId);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'employee'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getEmployees", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'create',
        possession: 'any',
        resource: 'employee'
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createEmployee", null);
__decorate([
    common_1.Get(':employeeId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'employee'
    }),
    __param(0, common_1.Param('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getEmployee", null);
__decorate([
    common_1.Patch(':employeeId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'update',
        possession: 'own',
        resource: 'employee'
    }),
    common_1.HttpCode(202),
    __param(0, common_1.Param('employeeId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateEmployee", null);
__decorate([
    common_1.Delete(':employeeId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'delete',
        possession: 'any',
        resource: 'employee'
    }),
    __param(0, common_1.Param('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "deleteEmployee", null);
EmployeesController = __decorate([
    common_1.Controller('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employees.controller.js.map