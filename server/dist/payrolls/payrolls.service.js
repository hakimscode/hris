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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_dto_1 = require("../shared/dto/response.dto");
let PayrollsService = class PayrollsService {
    constructor(PayrollModel) {
        this.PayrollModel = PayrollModel;
    }
    async getPayrolls() {
        const payrolls = await this.PayrollModel.find().exec();
        if (!payrolls.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Payroll does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Payrolls Found', payrolls);
    }
    async createPayroll(createPayrollDto) {
        const newPayroll = new this.PayrollModel(createPayrollDto);
        await newPayroll.save();
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Payroll has been submitted successfuuly', newPayroll);
    }
};
PayrollsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Payroll')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PayrollsService);
exports.PayrollsService = PayrollsService;
//# sourceMappingURL=payrolls.service.js.map