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
const salary_components_service_1 = require("./salary-components.service");
const salary_component_schema_1 = require("./schemas/salary-component.schema");
const salary_components_controller_1 = require("./salary-components.controller");
let SalaryComponentsModule = class SalaryComponentsModule {
};
SalaryComponentsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'SalaryComponents', schema: salary_component_schema_1.SalaryComponentSchema }
            ])
        ],
        providers: [salary_components_service_1.SalaryComponentsService],
        controllers: [salary_components_controller_1.SalaryComponentsController]
    })
], SalaryComponentsModule);
exports.SalaryComponentsModule = SalaryComponentsModule;
//# sourceMappingURL=salary-components.module.js.map