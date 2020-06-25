/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { SalaryComponent } from './interfaces/salary-component.interface';
import { CreateSalaryComponentDto } from './dtos/create-salary-component-dto';
import { UpdateSalaryComponentDto } from './dtos/update-salary-component-dto';

@Injectable()
export class SalaryComponentsService {
  constructor(
    @InjectModel('SalaryComponents')
    private readonly SalaryComponentModel: Model<SalaryComponent>
  ) {}

  async getSalaryComponents(): Promise<ResponseDto> {
    const SalaryComponents: SalaryComponent[] = await this.SalaryComponentModel.find().exec();

    if (!SalaryComponents.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Salary Components does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Salary Components Found',
      SalaryComponents
    );
  }

  async createSalaryComponent(
    createSalaryComponentDto: CreateSalaryComponentDto
  ): Promise<ResponseDto> {
    const newSalaryComponent: SalaryComponent = new this.SalaryComponentModel(
      createSalaryComponentDto
    );
    await newSalaryComponent.save();
    return new ResponseDto(
      HttpStatus.CREATED,
      'Salary Component has been submitted successfully',
      newSalaryComponent
    );
  }

  async getSalaryComponent(SalaryComponentId: string): Promise<ResponseDto> {
    const salaryComponent: SalaryComponent = await this.SalaryComponentModel.findById(
      SalaryComponentId
    ).exec();

    if (!salaryComponent) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Salary Component does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Salary Component Found',
      salaryComponent
    );
  }

  async updateSalaryComponent(
    SalaryComponentId: string,
    updateSalaryComponentDto: UpdateSalaryComponentDto
  ): Promise<ResponseDto> {
    const updatedSalaryComponent: SalaryComponent = await this.SalaryComponentModel.findByIdAndUpdate(
      SalaryComponentId,
      updateSalaryComponentDto,
      { new: true }
    );

    if (!updatedSalaryComponent) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Salary Component does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.ACCEPTED,
      'Salary Component has been updated successfully',
      updatedSalaryComponent
    );
  }

  async deleteSalaryComponent(salaryComponentId: string) {
    const deletedSalaryComponent: SalaryComponent = await this.SalaryComponentModel.findByIdAndRemove(
      salaryComponentId
    );

    if (!deletedSalaryComponent) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Salary Component does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Salary Component has been deleted successfully'
    );
  }
}
