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
let CompaniesService = class CompaniesService {
    constructor(CompanyModel) {
        this.CompanyModel = CompanyModel;
    }
    async getCompanies() {
        const companies = await this.CompanyModel.find().exec();
        if (!companies.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Company does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Companies Found', companies);
    }
    async addCompany(createCompanyDto) {
        const newCompany = new this.CompanyModel(createCompanyDto);
        await newCompany.save();
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Company has been submitted successfully', newCompany);
    }
    async getCompany(companyId) {
        const company = await this.CompanyModel.findById(companyId).exec();
        if (!company) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Company does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Company Found', company);
    }
    async updateCompany(companyId, updateCompanyDto) {
        const updatedCompany = await this.CompanyModel.findByIdAndUpdate(companyId, updateCompanyDto, { new: true });
        if (!updatedCompany) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Company does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.ACCEPTED, 'Company has been updated successfully', updatedCompany);
    }
    async deleteCompany(companyId) {
        const deletedCompany = await this.CompanyModel.findByIdAndRemove(companyId);
        if (!deletedCompany) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Company does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Company has been deleted successfully');
    }
};
CompaniesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Company')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map