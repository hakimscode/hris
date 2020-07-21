export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Master"
    },
    // {
    //   name: "Perusahaan",
    //   url: "/data/KategoriProduk",
    //   icon: "icon-magic-wand"
    // },
    {
      name: "Bonus",
      url: "/master/bonuses",
      icon: "icon-present"
    },
    {
      name: "Tunjangan",
      url: "/master/allowances",
      icon: "icon-envelope"
    },
    {
      name: "Potongan",
      url: "/master/deductions",
      icon: "icon-tag"
    },
    // {
    //   name: "Kandang",
    //   url: "/data/Kandangs",
    //   icon: "icon-home"
    // },
    {
      title: true,
      name: "Data"
    },
    {
      name: "Perusahaan",
      url: "/data/companies",
      icon: "icon-badge"
    },
    {
      name: "Pegawai",
      url: "/data/employees",
      icon: "icon-people"
    },
    {
      title: true,
      name: "Transaction"
    },
    {
      name: "Payrolls",
      url: "/transactions/payrolls",
      icon: "icon-diamond"
    },
    // {
    //   name: "Penjualan",
    //   url: "/transactions/Penjualan",
    //   icon: "icon-basket-loaded"
    // }
  ]
};
