export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      title: true,
      name: "Master",
    },
    {
      name: "Bonus",
      url: "/master/bonuses",
      icon: "icon-present",
    },
    {
      name: "Tunjangan",
      url: "/master/allowances",
      icon: "icon-envelope",
    },
    {
      name: "Potongan",
      url: "/master/deductions",
      icon: "icon-tag",
    },
    {
      title: true,
      name: "Data",
    },
    {
      name: "Perusahaan",
      url: "/data/companies",
      icon: "icon-badge",
    },
    {
      name: "Pegawai",
      url: "/data/employees",
      icon: "icon-people",
    },
    {
      name: "Admin",
      url: "/data/admins",
      icon: "icon-user",
    },
    {
      title: true,
      name: "Transaction",
    },
    {
      name: "Payrolls",
      url: "/transactions/payrolls",
      icon: "icon-diamond",
    },
  ],
};
