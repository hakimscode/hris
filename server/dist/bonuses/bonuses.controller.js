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
const bonuses_service_1 = require("./bonuses.service");
const create_bonus_dto_1 = require("./dtos/create-bonus-dto");
const update_bonus_dto_1 = require("./dtos/update-bonus-dto");
let BonusesController = class BonusesController {
    constructor(bonusServices) {
        this.bonusServices = bonusServices;
    }
    async getBonuses() {
        return this.bonusServices.getBonuses();
    }
    async createBonus(createBonusDto) {
        return this.bonusServices.createBonus(createBonusDto);
    }
    async getBonus(bonusId) {
        return this.bonusServices.getBonus(bonusId);
    }
    async updateBonus(bonusId, updateBonusDto) {
        return this.bonusServices.updateBonus(bonusId, updateBonusDto);
    }
    async deleteBonus(bonusId) {
        return this.bonusServices.deleteBonus(bonusId);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "getBonuses", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bonus_dto_1.CreateBonusDto]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "createBonus", null);
__decorate([
    common_1.Get(':bonusId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('bonusId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "getBonus", null);
__decorate([
    common_1.Patch(':bonusId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.HttpCode(202),
    __param(0, common_1.Param('bonusId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bonus_dto_1.UpdateBonusDto]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "updateBonus", null);
__decorate([
    common_1.Delete(':bonusId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('bonusId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "deleteBonus", null);
BonusesController = __decorate([
    common_1.Controller('bonuses'),
    __metadata("design:paramtypes", [bonuses_service_1.BonusesService])
], BonusesController);
exports.BonusesController = BonusesController;
//# sourceMappingURL=bonuses.controller.js.map