"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nest_access_control_1 = require("nest-access-control");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const companies_module_1 = require("./companies/companies.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const salary_components_module_1 = require("./salary-components/salary-components.module");
const employees_module_1 = require("./employees/employees.module");
const attendances_module_1 = require("./attendances/attendances.module");
const payrolls_module_1 = require("./payrolls/payrolls.module");
const app_roles_1 = require("./app.roles");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:4040/hris', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }),
            companies_module_1.CompaniesModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            salary_components_module_1.SalaryComponentsModule,
            employees_module_1.EmployeesModule,
            attendances_module_1.AttendancesModule,
            payrolls_module_1.PayrollsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map