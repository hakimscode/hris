import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
  Param
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendances')
export class AttendancesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  async getAttendances() {
    return this.attendancesService.getAttendances();
  }

  @Post()
  async absentIn(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.absentIn(createAttendanceDto);
  }

  @Patch(':employeeId')
  @HttpCode(202)
  async absentOut(
    @Param('employeeId') employeeId: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto
  ) {
    return this.attendancesService.absentOut(employeeId, updateAttendanceDto);
  }
}
