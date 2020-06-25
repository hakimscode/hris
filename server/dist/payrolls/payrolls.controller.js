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
const nest_access_control_1 = require("nest-access-control");
const passport_1 = require("@nestjs/passport");
const payrolls_service_1 = require("./payrolls.service");
const create_payroll_dto_1 = require("./dto/create-payroll.dto");
let PayrollsController = class PayrollsController {
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async getPayrolls() {
        return this.payrollService.getPayrolls();
    }
    async createPayroll(createPayrollDto) {
        return this.payrollService.createPayroll(createPayrollDto);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'payroll'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "getPayrolls", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'create',
        possession: 'any',
        resource: 'payroll'
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "createPayroll", null);
PayrollsController = __decorate([
    common_1.Controller('payrolls'),
    __metadata("design:paramtypes", [payrolls_service_1.PayrollsService])
], PayrollsController);
exports.PayrollsController = PayrollsController;
//# sourceMappingURL=payrolls.controller.js.map