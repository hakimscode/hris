import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Bonuses = React.lazy(() => import("./views/Master/Bonuses/Bonuses"));
const Allowances = React.lazy(() =>
  import("./views/Master/Allowances/Allowances")
);
const Deductions = React.lazy(() =>
  import("./views/Master/Deductions/Deductions")
);
const Companies = React.lazy(() => import("./views/Data/Companies/Companies"));
const Employees = React.lazy(() => import("./views/Data/Employees/Employees"));
const EmployeeForm = React.lazy(() =>
  import("./views/Data/Employees/EmployeeForm")
);
const EmployeeDetail = React.lazy(() =>
  import("./views/Data/Employees/EmployeeDetail")
);

const Admins = React.lazy(() => import("./views/Data/Admins/Admins"));

const Payrolls = React.lazy(() =>
  import("./views/Transactions/Payrolls/Payrolls")
);
const PayrollDetail = React.lazy(() =>
  import("./views/Transactions/Payrolls/PayrollDetail")
);
const PayrollForm = React.lazy(() =>
  import("./views/Transactions/Payrolls/PayrollForm")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/master/bonuses/",
    name: "Bonus",
    component: Bonuses,
  },
  {
    path: "/master/allowances",
    name: "Tunjangan",
    component: Allowances,
  },
  {
    path: "/master/deductions",
    name: "Potongan",
    component: Deductions,
  },
  {
    path: "/data/companies",
    name: "Perusahaan",
    component: Companies,
  },
  {
    path: "/data/employees",
    name: "Pegawai",
    exact: true,
    component: Employees,
  },
  {
    path: "/data/employee/add",
    name: "Tambah Pegawai",
    exact: true,
    component: EmployeeForm,
  },
  {
    path: "/data/employee/:employeeId/edit",
    name: "Edit Pegawai",
    exact: true,
    component: EmployeeForm,
  },
  {
    path: "/data/employee/:employeeId",
    name: "Detail Pegawai",
    exact: true,
    component: EmployeeDetail,
  },
  {
    path: "/data/admins",
    name: "Admin",
    exact: true,
    component: Admins,
    adminMenu: true,
  },
  {
    path: "/transactions/payrolls",
    name: "Payrolls",
    exact: true,
    component: Payrolls,
  },
  {
    path: "/transactions/payroll/add",
    name: "Tambah Payroll",
    exact: true,
    component: PayrollForm,
  },
  {
    path: "/transactions/payroll/:payrollId",
    name: "Detail Payroll",
    exact: true,
    component: PayrollDetail,
  },
];

export default routes;
