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
let SalaryComponentsService = class SalaryComponentsService {
    constructor(SalaryComponentModel) {
        this.SalaryComponentModel = SalaryComponentModel;
    }
    async getSalaryComponents() {
        const SalaryComponents = await this.SalaryComponentModel.find().exec();
        if (!SalaryComponents.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Salary Components does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Salary Components Found', SalaryComponents);
    }
    async createSalaryComponent(createSalaryComponentDto) {
        const newSalaryComponent = new this.SalaryComponentModel(createSalaryComponentDto);
        await newSalaryComponent.save();
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Salary Component has been submitted successfully', newSalaryComponent);
    }
    async getSalaryComponent(SalaryComponentId) {
        const salaryComponent = await this.SalaryComponentModel.findById(SalaryComponentId).exec();
        if (!salaryComponent) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Salary Component does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Salary Component Found', salaryComponent);
    }
    async updateSalaryComponent(SalaryComponentId, updateSalaryComponentDto) {
        const updatedSalaryComponent = await this.SalaryComponentModel.findByIdAndUpdate(SalaryComponentId, updateSalaryComponentDto, { new: true });
        if (!updatedSalaryComponent) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Salary Component does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.ACCEPTED, 'Salary Component has been updated successfully', updatedSalaryComponent);
    }
    async deleteSalaryComponent(salaryComponentId) {
        const deletedSalaryComponent = await this.SalaryComponentModel.findByIdAndRemove(salaryComponentId);
        if (!deletedSalaryComponent) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Salary Component does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Salary Component has been deleted successfully');
    }
};
SalaryComponentsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('SalaryComponents')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SalaryComponentsService);
exports.SalaryComponentsService = SalaryComponentsService;
//# sourceMappingURL=salary-components.service.js.map