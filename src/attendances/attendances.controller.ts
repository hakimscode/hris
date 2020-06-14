import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
  Param,
  UseGuards
} from '@nestjs/common';
import { UseRoles, ACGuard } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendances')
export class AttendancesController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'attendance'
  })
  async getAttendances() {
    return this.attendancesService.getAttendances();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'attendance'
  })
  async absentIn(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.absentIn(createAttendanceDto);
  }

  @Patch(':employeeId')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'attendance'
  })
  @HttpCode(202)
  async absentOut(
    @Param('employeeId') employeeId: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto
  ) {
    return this.attendancesService.absentOut(employeeId, updateAttendanceDto);
  }
}
