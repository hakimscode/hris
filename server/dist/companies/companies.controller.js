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
const companies_service_1 = require("./companies.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    async getCompanies() {
        return this.companiesService.getCompanies();
    }
    async addCompanies(createCompanyDto) {
        return this.companiesService.addCompany(createCompanyDto);
    }
    async getCompany(companyId) {
        return this.companiesService.getCompany(companyId);
    }
    async updateCompany(companyId, updateCompanyDto) {
        return this.companiesService.updateCompany(companyId, updateCompanyDto);
    }
    async deleteCompany(companyId) {
        return this.companiesService.deleteCompany(companyId);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'company'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "getCompanies", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'create',
        possession: 'any',
        resource: 'company'
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "addCompanies", null);
__decorate([
    common_1.Get(':companyId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'company'
    }),
    __param(0, common_1.Param('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "getCompany", null);
__decorate([
    common_1.Patch(':companyId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'update',
        possession: 'any',
        resource: 'company'
    }),
    common_1.HttpCode(202),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "updateCompany", null);
__decorate([
    common_1.Delete(':companyId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'delete',
        possession: 'any',
        resource: 'company'
    }),
    __param(0, common_1.Param('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "deleteCompany", null);
CompaniesController = __decorate([
    common_1.Controller('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
exports.CompaniesController = CompaniesController;
//# sourceMappingURL=companies.controller.js.map