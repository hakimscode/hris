import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Table,
} from "reactstrap";
import axios from "axios";
import currencyFormat from "../../../shared/currencyFormat";

class PayrollForm extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/payrolls";
    this.API_URL_EMPLOYEES = process.env.REACT_APP_API_URL + "/employees";
    this.API_URL_SALARY_COMPONENTS =
      process.env.REACT_APP_API_URL + "/salary-components";

    this.state = {
      employees: [],

      selectedEmployee: {
        name: "",
        companyName: "",
        department: "",
        role: "",
        primarySalary: 0,
        dailyAllowance: 0,
      },

      period: "",
      date: "",
      employee: "",
      benefitSalary: [],
      cutSalary: [],

      workingDays: 20,

      netSalary: 0,

      actionSubmit: "Simpan",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.API_URL_EMPLOYEES, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        this.setState({ employees: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "employee") {
      if (e.target.value === "") {
        this.resetForm();
      }
      this.getEmployee(e.target.value);
    }

    if (e.target.name === "workingDays") {
      const workingDays = e.target.value === "" ? 0 : parseInt(e.target.value);
      this.setState({
        benefitSalary: this.state.benefitSalary.map((itemSalary) => {
          if (itemSalary.name === "Uang Harian") {
            itemSalary.amount =
              this.state.selectedEmployee.dailyAllowance * workingDays;
          }
          return itemSalary;
        }),
      });
      this.netSalary();
    }
  };

  getEmployee = (employeeId) => {
    if (employeeId !== "") {
      axios
        .get(this.API_URL_EMPLOYEES + "/" + employeeId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const { profile, salary, company, position } = res.data.data;
            const defaultSalary = [
              { name: "Gaji Utama", amount: salary.primarySalary },
              {
                name: "Uang Harian",
                amount: salary.dailyAllowance * this.state.workingDays,
              },
            ];

            this.setState({
              selectedEmployee: {
                name: profile.name,
                companyName: company.name,
                department: position.department,
                role: position.role,
                primarySalary: salary.primarySalary,
                dailyAllowance: salary.dailyAllowance,
              },
              benefitSalary: defaultSalary,
            });

            this.listSalaryComponents();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  listSalaryComponents = () => {
    axios
      .get(this.API_URL_SALARY_COMPONENTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        const salaryComponents = res.data.data;

        salaryComponents.forEach((salaryComponent) => {
          let { componentName, amount } = salaryComponent;

          if (!salaryComponent.decimalUnit) {
            amount = (amount / 100) * this.state.selectedEmployee.primarySalary;
          }

          const newComponent = {
            name: componentName,
            amount,
          };
          if (salaryComponent.isAdders) {
            this.setState({
              benefitSalary: [...this.state.benefitSalary, newComponent],
            });
          } else {
            this.setState({
              cutSalary: [...this.state.cutSalary, newComponent],
            });
          }
        });

        this.netSalary();
      })
      .catch((err) => console.log(err));
  };

  netSalary = () => {
    const totalSalary = this.state.benefitSalary.reduce(
      (prev, curr) => prev + (curr["amount"] || 0),
      0
    );

    const totalCuts = this.state.cutSalary.reduce(
      (prev, curr) => prev + (curr["amount"] || 0),
      0
    );

    const netSalary = totalSalary - totalCuts;

    this.setState({ netSalary });
  };

  resetForm = () => {
    this.setState({
      period: "",
      date: "",
      employee: "",
      benefitSalary: [],
      cutSalary: [],
      selectedEmployee: {
        name: "",
        companyName: "",
        department: "",
        role: "",
      },
      netSalary: 0,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { employee, period, date, benefitSalary, cutSalary } = this.state;
    axios
      .post(
        this.API_URL,
        {
          employee,
          period,
          date,
          benefitSalary,
          cutSalary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert("Data berhasil disimpan");
          this.props.history.push("/transactions/payrolls");
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Payroll
              </CardHeader>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardBody>
                  <Row>
                    <Col xs="6" md="6">
                      <FormGroup>
                        <Label htmlFor="employee-name">Pegawai</Label>
                        <Input
                          type="select"
                          name="employee"
                          onChange={this.handleChange}
                          value={this.state.employee}
                          required
                        >
                          <option value="">-- pilih pegawai --</option>
                          {this.state.employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                              {`${employee.profile.name} (${employee.position.role} at ${employee.company.name})`}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="2">
                      <FormGroup>
                        <Label htmlFor="field">Periode</Label>
                        <Input
                          type="select"
                          name="period"
                          onChange={this.handleChange}
                          value={this.state.period}
                          required
                          placeholder="Periode"
                        >
                          <option value="Januari">Januari</option>
                          <option value="Februari">Februari</option>
                          <option value="Maret">Maret</option>
                          <option value="April">April</option>
                          <option value="Mei">Mei</option>
                          <option value="Juni">Juni</option>
                          <option value="Juli">Juli</option>
                          <option value="Agustus">Agustus</option>
                          <option value="September">September</option>
                          <option value="Oktober">Oktober</option>
                          <option value="November">November</option>
                          <option value="Desember">Desember</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="2">
                      <FormGroup>
                        <Label htmlFor="field">Tanggal</Label>
                        <Input
                          type="text"
                          name="date"
                          onChange={this.handleChange}
                          value={this.state.date}
                          required
                          placeholder="Tanggal"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="2">
                      <FormGroup>
                        <Label htmlFor="field">Hari Kerja</Label>
                        <Input
                          type="number"
                          name="workingDays"
                          onChange={this.handleChange}
                          value={this.state.workingDays}
                          required
                          placeholder="Hari Kerja"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6" lg="6">
                      <ListGroup>
                        <ListGroupItem>
                          Perusahaan :{" "}
                          <strong>
                            {this.state.selectedEmployee.companyName}
                          </strong>
                        </ListGroupItem>
                        <ListGroupItem>
                          Nama Pegawai :{" "}
                          <strong>{this.state.selectedEmployee.name}</strong>
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                    <Col xs="6" lg="6">
                      <ListGroup>
                        <ListGroupItem>
                          Departemen :{" "}
                          <strong>
                            {this.state.selectedEmployee.department}
                          </strong>
                        </ListGroupItem>
                        <ListGroupItem>
                          Jabatan :{" "}
                          <strong>{this.state.selectedEmployee.role}</strong>
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                  </Row>

                  <hr></hr>

                  <Row>
                    <Col xs="12" lg="12">
                      <h5>Gaji Pokok, Tunjangan dan Bonus</h5>
                      <Table responsive>
                        <tbody>
                          {this.state.benefitSalary.map((salaryItem, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{salaryItem.name}</td>
                              <td align="right">
                                {currencyFormat.format(salaryItem.amount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <hr></hr>

                  <Row>
                    <Col xs="12" lg="12">
                      <h5>Potongan</h5>
                      <Table responsive>
                        <tbody>
                          {this.state.cutSalary.map((salaryItem, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{salaryItem.name}</td>
                              <td align="right">
                                {currencyFormat.format(salaryItem.amount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <hr></hr>

                  <Row>
                    <Col xs="12" lg="12">
                      <h5>Total</h5>
                      <Table responsive>
                        <tbody>
                          <tr>
                            <td colSpan="3" align="right">
                              <strong>
                                {currencyFormat.format(this.state.netSalary)}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>{" "}
                    {this.state.actionSubmit}
                  </Button>
                  <Button size="sm" color="danger" onClick={this.resetForm}>
                    <i className="fa fa-ban"></i> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PayrollForm;
