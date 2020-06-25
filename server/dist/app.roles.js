"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN_ROLE"] = "Admin";
    AppRoles["EMPLOYEE_ROLE"] = "Employee";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(AppRoles.ADMIN_ROLE)
    .createAny(['employee', 'salaryComponent', 'payroll', 'company'])
    .updateAny(['employee', 'salaryComponent', 'payroll', 'company'])
    .readAny(['employee', 'salaryComponent', 'payroll', 'company', 'attendance'])
    .deleteAny([
    'employee',
    'salaryComponent',
    'payroll',
    'company',
    'attendance'
]);
exports.roles
    .grant(AppRoles.EMPLOYEE_ROLE)
    .createOwn(['attendance'])
    .updateOwn(['employee'])
    .readOwn('attendance', 'payroll');
//# sourceMappingURL=app.roles.js.map