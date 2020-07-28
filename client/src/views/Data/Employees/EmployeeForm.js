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
} from "reactstrap";
import axios from "axios";

class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5001/employees";
    this.API_URL_COMPANIES = "http://localhost:5001/companies";

    this.state = {
      companies: [],

      companyId: "",
      idNumber: "",
      name: "",
      address: "",
      gender: "",
      placeOfBirth: "",
      dateOfBirth: "",
      maritalStatus: "",
      phoneNumber: "",
      email: "",
      department: "",
      role: "",
      primarySalary: "",
      dailyAllowance: "",

      actionSubmit: "Simpan",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.API_URL_COMPANIES, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        this.setState({ companies: res.data.data });
      })
      .catch((err) => console.log(err));

    const url = this.props.match.url;
    if (url.includes("edit")) {
      const employeeId = this.props.match.params.employeeId;

      axios
        .get(this.API_URL + "/" + employeeId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          const companyId = res.data.data.companyId;
          const {
            idCardNumber,
            name,
            address,
            gender,
            placeOfBirth,
            dateOfBirth,
            maritalStatus,
          } = res.data.data.profile;
          const { phoneNumber, email } = res.data.data.contact;
          const { department, role } = res.data.data.position;
          const { primarySalary, dailyAllowance } = res.data.data.salary;

          this.setState({
            companyId,
            idNumber: idCardNumber,
            name,
            address,
            gender,
            placeOfBirth,
            dateOfBirth,
            maritalStatus,
            phoneNumber,
            email,
            department,
            role,
            primarySalary,
            dailyAllowance,
            actionSubmit: "Edit",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Data tidak ada");
          this.props.history.push("/data/employees");
        });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      companyId: "",
      idNumber: "",
      name: "",
      address: "",
      gender: "",
      placeOfBirth: "",
      dateOfBirth: "",
      maritalStatus: "",
      phoneNumber: "",
      email: "",
      department: "",
      role: "",
      primarySalary: "",
      dailyAllowance: "",
    });
  };

  actionStatus = (employeeId) => {
    if (employeeId !== "") {
      axios
        .get(this.API_URL + "/" + employeeId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          this.setState({
            selectedId: employeeId,
            name: res.data.data.name,
            field: res.data.data.field,
            address: res.data.data.address,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.resetForm();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.actionSubmit === "Simpan") {
      axios
        .post(
          this.API_URL,
          {
            name: this.state.name,
            field: this.state.field,
            address: this.state.address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            this.setState({
              employees: [...this.state.employees, res.data.data],
            });
            this.resetForm();
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(this.state);
        });
    } else {
      axios
        .patch(
          this.API_URL + "/" + this.state.selectedId,
          {
            name: this.state.name,
            field: this.state.field,
            address: this.state.address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 202) {
            this.setState({
              employees: this.state.employees.map((employee) => {
                if (employee._id === res.data.data._id) {
                  employee.name = res.data.data.name;
                  employee.field = res.data.data.field;
                  employee.address = res.data.data.address;
                }
                return employee;
              }),
            });

            this.resetForm();
          } else {
            console.log("error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Pegawai
              </CardHeader>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardBody>
                  <Row>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="field">NIK</Label>
                        <Input
                          type="text"
                          name="idNumber"
                          onChange={this.handleChange}
                          value={this.state.idNumber}
                          required
                          placeholder="NIK"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" md="6">
                      <FormGroup>
                        <Label htmlFor="employee-name">Nama Pegawai</Label>
                        <Input
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.name}
                          required
                          placeholder="Nama Pegawai"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="2">
                      <FormGroup>
                        <Label htmlFor="employee-name">Jenis Kelamin</Label>
                        <Input
                          type="select"
                          name="gender"
                          onChange={this.handleChange}
                          value={this.state.gender}
                          required
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="field">Tempat Lahir</Label>
                        <Input
                          type="text"
                          name="placeOfBirth"
                          onChange={this.handleChange}
                          value={this.state.placeOfBirth}
                          required
                          placeholder="Tempat Lahir"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="field">Tanggal Lahir</Label>
                        <Input
                          type="text"
                          name="dateOfBirth"
                          onChange={this.handleChange}
                          value={this.state.dateOfBirth}
                          required
                          placeholder="Tanggal Lahir"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="employee-name">Status Kawin</Label>
                        <Input
                          type="select"
                          name="maritalStatus"
                          onChange={this.handleChange}
                          value={this.state.maritalStatus}
                          required
                        >
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6" md="6">
                      <Row>
                        <Col xs="12" md="12">
                          <FormGroup>
                            <Label htmlFor="field">Email</Label>
                            <Input
                              type="email"
                              name="email"
                              onChange={this.handleChange}
                              value={this.state.email}
                              required
                              placeholder="Email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="12" md="12">
                          <FormGroup>
                            <Label htmlFor="field">No HP</Label>
                            <Input
                              type="text"
                              name="phoneNumber"
                              onChange={this.handleChange}
                              value={this.state.phoneNumber}
                              required
                              placeholder="No HP"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="6" md="6">
                      <FormGroup>
                        <Label htmlFor="unit">Alamat</Label>
                        <Input
                          type="textarea"
                          name="address"
                          onChange={this.handleChange}
                          value={this.state.address}
                          rows="5"
                          placeholder="Alamat"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6" md="6">
                      <FormGroup>
                        <Label htmlFor="employee-name">Perusahaan</Label>
                        <Input
                          type="select"
                          name="companyId"
                          onChange={this.handleChange}
                          value={this.state.companyId}
                          required
                        >
                          <option value="">-- pilih perusahaan --</option>
                          {this.state.companies.map((company) => (
                            <option key={company._id} value={company._id}>
                              {company.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6" md="6">
                      <FormGroup>
                        <Label htmlFor="employee-name">Departemen</Label>
                        <Input
                          type="text"
                          name="department"
                          onChange={this.handleChange}
                          value={this.state.department}
                          required
                          placeholder="Departemen"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="employee-name">Jabatan</Label>
                        <Input
                          type="text"
                          name="role"
                          onChange={this.handleChange}
                          value={this.state.role}
                          required
                          placeholder="Jabatan"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="employee-name">Gaji Pokok</Label>
                        <Input
                          type="number"
                          name="primarySalary"
                          onChange={this.handleChange}
                          value={this.state.primarySalary}
                          required
                          placeholder="Gaji Pokok"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" md="4">
                      <FormGroup>
                        <Label htmlFor="employee-name">Uang Harian</Label>
                        <Input
                          type="number"
                          name="dailyAllowance"
                          onChange={this.handleChange}
                          value={this.state.dailyAllowance}
                          required
                          placeholder="Uang Harian"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>{" "}
                    {this.state.actionSubmit}
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={this.actionStatus.bind(this, "")}
                  >
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

export default EmployeeForm;
