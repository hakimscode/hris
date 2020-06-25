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
const salary_components_service_1 = require("./salary-components.service");
const create_salary_component_dto_1 = require("./dtos/create-salary-component-dto");
const update_salary_component_dto_1 = require("./dtos/update-salary-component-dto");
let SalaryComponentsController = class SalaryComponentsController {
    constructor(SalaryComponentsServices) {
        this.SalaryComponentsServices = SalaryComponentsServices;
    }
    async getSalaryComponents() {
        return this.SalaryComponentsServices.getSalaryComponents();
    }
    async createSalaryComponent(createSalaryComponentDto) {
        return this.SalaryComponentsServices.createSalaryComponent(createSalaryComponentDto);
    }
    async getSalaryComponent(SalaryComponentId) {
        return this.SalaryComponentsServices.getSalaryComponent(SalaryComponentId);
    }
    async updateSalaryComponent(SalaryComponentId, updateSalaryComponentDto) {
        return this.SalaryComponentsServices.updateSalaryComponent(SalaryComponentId, updateSalaryComponentDto);
    }
    async deleteSalaryComponent(SalaryComponentId) {
        return this.SalaryComponentsServices.deleteSalaryComponent(SalaryComponentId);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'salaryComponent'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalaryComponentsController.prototype, "getSalaryComponents", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'create',
        possession: 'any',
        resource: 'salaryComponent'
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_salary_component_dto_1.CreateSalaryComponentDto]),
    __metadata("design:returntype", Promise)
], SalaryComponentsController.prototype, "createSalaryComponent", null);
__decorate([
    common_1.Get(':SalaryComponentId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'salaryComponent'
    }),
    __param(0, common_1.Param('SalaryComponentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalaryComponentsController.prototype, "getSalaryComponent", null);
__decorate([
    common_1.Patch(':SalaryComponentId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'update',
        possession: 'any',
        resource: 'salaryComponent'
    }),
    common_1.HttpCode(202),
    __param(0, common_1.Param('SalaryComponentId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_salary_component_dto_1.UpdateSalaryComponentDto]),
    __metadata("design:returntype", Promise)
], SalaryComponentsController.prototype, "updateSalaryComponent", null);
__decorate([
    common_1.Delete(':SalaryComponentId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'delete',
        possession: 'any',
        resource: 'salaryComponent'
    }),
    __param(0, common_1.Param('SalaryComponentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalaryComponentsController.prototype, "deleteSalaryComponent", null);
SalaryComponentsController = __decorate([
    common_1.Controller('salary-components'),
    __metadata("design:paramtypes", [salary_components_service_1.SalaryComponentsService])
], SalaryComponentsController);
exports.SalaryComponentsController = SalaryComponentsController;
//# sourceMappingURL=salary-components.controller.js.map