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
const attendances_service_1 = require("./attendances.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
let AttendancesController = class AttendancesController {
    constructor(attendancesService) {
        this.attendancesService = attendancesService;
    }
    async getAttendances() {
        return this.attendancesService.getAttendances();
    }
    async absentIn(createAttendanceDto) {
        return this.attendancesService.absentIn(createAttendanceDto);
    }
    async absentOut(employeeId, updateAttendanceDto) {
        return this.attendancesService.absentOut(employeeId, updateAttendanceDto);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'attendance'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendancesController.prototype, "getAttendances", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'create',
        possession: 'own',
        resource: 'attendance'
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendancesController.prototype, "absentIn", null);
__decorate([
    common_1.Patch(':employeeId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), nest_access_control_1.ACGuard),
    nest_access_control_1.UseRoles({
        action: 'update',
        possession: 'own',
        resource: 'attendance'
    }),
    common_1.HttpCode(202),
    __param(0, common_1.Param('employeeId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendancesController.prototype, "absentOut", null);
AttendancesController = __decorate([
    common_1.Controller('attendances'),
    __metadata("design:paramtypes", [attendances_service_1.AttendancesService])
], AttendancesController);
exports.AttendancesController = AttendancesController;
//# sourceMappingURL=attendances.controller.js.map