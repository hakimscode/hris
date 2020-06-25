/* eslint-disable no-empty-function */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '../shared/dto/response.dto';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Company') private readonly CompanyModel: Model<Company>
  ) {}

  async getCompanies(): Promise<ResponseDto> {
    const companies: Company[] = await this.CompanyModel.find().exec();

    if (!companies.length) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Company does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Companies Found', companies);
  }

  async addCompany(createCompanyDto: CreateCompanyDto): Promise<ResponseDto> {
    const newCompany: Company = new this.CompanyModel(createCompanyDto);
    await newCompany.save();
    return new ResponseDto(
      HttpStatus.CREATED,
      'Company has been submitted successfully',
      newCompany
    );
  }

  async getCompany(companyId: string): Promise<ResponseDto> {
    const company: Company = await this.CompanyModel.findById(companyId).exec();

    if (!company) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Company does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(HttpStatus.OK, 'Company Found', company);
  }

  async updateCompany(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<ResponseDto> {
    const updatedCompany: Company = await this.CompanyModel.findByIdAndUpdate(
      companyId,
      updateCompanyDto,
      { new: true }
    );

    if (!updatedCompany) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Company does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.ACCEPTED,
      'Company has been updated successfully',
      updatedCompany
    );
  }

  async deleteCompany(companyId: string): Promise<ResponseDto> {
    const deletedCompany = await this.CompanyModel.findByIdAndRemove(companyId);

    if (!deletedCompany) {
      const response = new ResponseDto(
        HttpStatus.NOT_FOUND,
        'Company does not exist'
      );
      throw new HttpException(response, response.statusCode);
    }

    return new ResponseDto(
      HttpStatus.OK,
      'Company has been deleted successfully'
    );
  }
}
