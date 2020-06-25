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
let AttendancesService = class AttendancesService {
    constructor(AttendanceModel) {
        this.AttendanceModel = AttendanceModel;
    }
    async getAttendances() {
        const attendances = await this.AttendanceModel.find().exec();
        if (!attendances.length) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.NOT_FOUND, 'Attendances does not exist');
            throw new common_1.HttpException(response, response.statusCode);
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.OK, 'Attendances Found', attendances);
    }
    async absentIn(createAttendanceDto) {
        const { dateOfAttendance, employeeId, timeIn, note } = createAttendanceDto;
        const attendance = await this.AttendanceModel.findOne({
            dateOfAttendance
        }).exec();
        if (attendance) {
            const isAbsentIn = attendance.bodyOfAttendances.filter(bodyOfAttendance => bodyOfAttendance.employeeId === employeeId);
            if (isAbsentIn.length) {
                const response = new response_dto_1.ResponseDto(common_1.HttpStatus.BAD_REQUEST, 'You Are Already Absent In');
                throw new common_1.HttpException(response, response.statusCode);
            }
            else {
                attendance.bodyOfAttendances.push({
                    employeeId,
                    timeIn,
                    timeOut: '',
                    note
                });
                await attendance.save();
            }
        }
        else {
            const bodyOfAttendances = [{ employeeId, timeIn, note }];
            const newAttendance = new this.AttendanceModel({
                dateOfAttendance,
                bodyOfAttendances
            });
            await newAttendance.save();
        }
        return new response_dto_1.ResponseDto(common_1.HttpStatus.CREATED, 'Attendance has been submitted successfully');
    }
    async absentOut(employeeId, updateAttendanceDto) {
        const { dateOfAttendance, timeOut, note } = updateAttendanceDto;
        const attendance = await this.AttendanceModel.findOne({
            dateOfAttendance,
            'bodyOfAttendances.employeeId': employeeId
        });
        if (!attendance) {
            const response = new response_dto_1.ResponseDto(common_1.HttpStatus.BAD_REQUEST, 'You Are Not Absent In Yet!');
            throw new common_1.HttpException(response, response.statusCode);
        }
        await this.AttendanceModel.updateOne({
            dateOfAttendance,
            'bodyOfAttendances.employeeId': employeeId
        }, {
            $set: {
                'bodyOfAttendances.$.timeOut': timeOut,
                'bodyOfAttendances.$.note': note
            }
        });
        return new response_dto_1.ResponseDto(common_1.HttpStatus.ACCEPTED, 'Absent out');
    }
};
AttendancesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Attendance')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendancesService);
exports.AttendancesService = AttendancesService;
//# sourceMappingURL=attendances.service.js.map