/* eslint-disable no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>
  ) {}

  async getCompanies(): Promise<Company[]> {
    const companies = await this.companyModel.find().exec();
    return companies;
  }

  async addCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // eslint-disable-next-line new-cap
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  async getCompany(companyId: string): Promise<Company> {
    const company = await this.companyModel.findById(companyId).exec();
    return company;
  }

  async updateCompany(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    const updatedCompany = await this.companyModel.findByIdAndUpdate(
      companyId,
      updateCompanyDto,
      { new: true }
    );
    return updatedCompany;
  }

  async deleteCompany(companyId: string): Promise<Company> {
    const deletedCompany = await this.companyModel.findByIdAndRemove(companyId);
    return deletedCompany;
  }
}
