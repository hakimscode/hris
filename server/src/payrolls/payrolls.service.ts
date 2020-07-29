/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Payroll } from './interfaces/payrolls.interface';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Injectable()
export class PayrollsService {
  constructor(
    @InjectModel('Payroll') private readonly PayrollModel: Model<Payroll>
  ) {}

  async getPayrolls(): Promise<ResponseDto> {
    const payrolls: Payroll[] = await this.PayrollModel.find()
      .populate('employee', 'profile.name')
      .exec();

    if (!payrolls.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Payroll does not exist'
      );

      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Payrolls Found', payrolls);
  }

  async createPayroll(
    createPayrollDto: CreatePayrollDto
  ): Promise<ResponseDto> {
    const newPayroll: Payroll = new this.PayrollModel(createPayrollDto);
    await newPayroll.save();

    return new ResponseDto(
      HttpStatus.CREATED,
      'Payroll has been submitted successfuuly'
    );
  }
}
