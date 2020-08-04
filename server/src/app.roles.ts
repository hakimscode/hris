import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN_ROLE = 'Admin',
  ADMIN_COMPANY_ROLE = 'Admin Company',
  EMPLOYEE_ROLE = 'Employee'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN_ROLE)
  .createAny(['employee', 'salaryComponent', 'payroll', 'company', 'user'])
  .updateAny(['employee', 'salaryComponent', 'payroll', 'company'])
  .readAny([
    'employee',
    'salaryComponent',
    'payroll',
    'company',
    'attendance',
    'user'
  ])
  .deleteAny([
    'employee',
    'salaryComponent',
    'payroll',
    'company',
    'attendance',
    'user'
  ]);

roles.grant(AppRoles.ADMIN_COMPANY_ROLE).extend(AppRoles.ADMIN_ROLE);

roles
  .grant(AppRoles.EMPLOYEE_ROLE)
  .createOwn(['attendance'])
  .updateOwn(['employee'])
  .readOwn('attendance', 'payroll');
