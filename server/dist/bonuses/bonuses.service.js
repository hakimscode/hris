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
let BonusesService = class BonusesService {
    constructor(BonusModel) {
        this.BonusModel = BonusModel;
    }
    async getBonuses() {
        const bonuses = await this.BonusModel.find().exec();
        if (!bonuses.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Bonus does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Bonuses Found', bonuses);
    }
    async createBonus(createBonusDto) {
        const newBonus = new this.BonusModel(createBonusDto);
        await newBonus.save();
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Bonus has been submitted successfully', newBonus);
    }
    async getBonus(bonusId) {
        const bonus = await this.BonusModel.findById(bonusId).exec();
        if (!bonus) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Bonus does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Bonus Found', bonus);
    }
    async updateBonus(bonusId, updateBonusDto) {
        const updatedBonus = await this.BonusModel.findByIdAndUpdate(bonusId, updateBonusDto, { new: true });
        if (!updatedBonus) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Bonus does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.ACCEPTED, 'Bonus has been updated successfully', updatedBonus);
    }
    async deleteBonus(bonusId) {
        const deletedBonus = await this.BonusModel.findByIdAndRemove(bonusId);
        if (!deletedBonus) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Bonus does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Bonus has been deleted successfully');
    }
};
BonusesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Bonus')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BonusesService);
exports.BonusesService = BonusesService;
//# sourceMappingURL=bonuses.service.js.map