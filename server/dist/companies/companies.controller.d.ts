import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    getCompanies(): Promise<import("../shared/dto/response.dto").ResponseDto>;
    addCompanies(createCompanyDto: CreateCompanyDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    getCompany(companyId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
    updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto): Promise<import("../shared/dto/response.dto").ResponseDto>;
    deleteCompany(companyId: string): Promise<import("../shared/dto/response.dto").ResponseDto>;
}
