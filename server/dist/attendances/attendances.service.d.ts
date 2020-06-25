import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Attendance } from './interfaces/attendance.interface';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendancesService {
    private readonly AttendanceModel;
    constructor(AttendanceModel: Model<Attendance>);
    getAttendances(): Promise<ResponseDto>;
    absentIn(createAttendanceDto: CreateAttendanceDto): Promise<ResponseDto>;
    absentOut(employeeId: string, updateAttendanceDto: UpdateAttendanceDto): Promise<ResponseDto>;
}
