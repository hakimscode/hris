/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Attendance } from './interfaces/attendance.interface';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectModel('Attendance')
    private readonly AttendanceModel: Model<Attendance>
  ) {}

  async getAttendances(): Promise<ResponseDto> {
    const attendances: Attendance[] = await this.AttendanceModel.find().exec();

    if (!attendances.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Attendances does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Attendances Found', attendances);
  }

  async absentIn(
    createAttendanceDto: CreateAttendanceDto
  ): Promise<ResponseDto> {
    const { dateOfAttendance, employeeId, timeIn, note } = createAttendanceDto;

    const attendance = await this.AttendanceModel.findOne({
      dateOfAttendance
    }).exec();

    if (attendance) {
      const isAbsentIn = attendance.bodyOfAttendances.filter(
        bodyOfAttendance => bodyOfAttendance.employeeId === employeeId
      );

      if (isAbsentIn.length) {
        const response = new ResponseDto(
          HttpStatus.BAD_REQUEST,
          'You Are Already Absent In'
        );
        throw new HttpException(response, response.statusCode);
      } else {
        attendance.bodyOfAttendances.push({
          employeeId,
          timeIn,
          timeOut: '',
          note
        });
        await attendance.save();
      }
    } else {
      const bodyOfAttendances = [{ employeeId, timeIn, note }];
      const newAttendance = new this.AttendanceModel({
        dateOfAttendance,
        bodyOfAttendances
      });
      await newAttendance.save();
    }

    return new ResponseDto(
      HttpStatus.CREATED,
      'Attendance has been submitted successfully'
    );
  }

  async absentOut(
    employeeId: string,
    updateAttendanceDto: UpdateAttendanceDto
  ): Promise<ResponseDto> {
    const { dateOfAttendance, timeOut, note } = updateAttendanceDto;
    const attendance = await this.AttendanceModel.findOne({
      dateOfAttendance,
      'bodyOfAttendances.employeeId': employeeId
    });

    if (!attendance) {
      const response = new ResponseDto(
        HttpStatus.BAD_REQUEST,
        'You Are Not Absent In Yet!'
      );
      throw new HttpException(response, response.statusCode);
    }

    await this.AttendanceModel.updateOne(
      {
        dateOfAttendance,
        'bodyOfAttendances.employeeId': employeeId
      },
      {
        $set: {
          'bodyOfAttendances.$.timeOut': timeOut,
          'bodyOfAttendances.$.note': note
        }
      }
    );

    return new ResponseDto(HttpStatus.ACCEPTED, 'Absent out');
  }
}
