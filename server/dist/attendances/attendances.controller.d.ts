import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendancesController {
    private readonly attendancesService;
    constructor(attendancesService: AttendancesService);
    getAttendances(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    absentIn(createAttendanceDto: CreateAttendanceDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    absentOut(employeeId: string, updateAttendanceDto: UpdateAttendanceDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
