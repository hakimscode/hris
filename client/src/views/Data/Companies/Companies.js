import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

class Companies extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5001/companies";

    this.state = {
      companies: [],

      name: "",
      field: "",
      address: "",

      selectedId: "",
      actionSubmit: "Simpan",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.API_URL, {
        params: { componentType: this.state.componentType },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        this.setState({ companies: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  actionStatus = (companyId) => {
    if (companyId !== "") {
      axios
        .get(this.API_URL + "/" + companyId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          this.setState({
            selectedId: companyId,
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

  hapusClick = (companyId) => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(this.API_URL + "/" + companyId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then(() => {
          this.setState({
            companies: [
              ...this.state.companies.filter(
                (company) => company._id !== companyId
              ),
            ],
          });
        })
        .catch((err) => console.log(err));
    }
  };

  resetForm = () => {
    this.setState({
      name: "",
      field: "",
      address: "",
      selectedId: "",
      actionSubmit: "Simpan",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.selectedId === "") {
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
              companies: [...this.state.companies, res.data.data],
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
              companies: this.state.companies.map((company) => {
                if (company._id === res.data.data._id) {
                  company.name = res.data.data.name;
                  company.field = res.data.data.field;
                  company.address = res.data.data.address;
                }
                return company;
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
                <i className="fa fa-align-justify"></i> Form Perusahaan
              </CardHeader>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardBody>
                  <FormGroup>
                    <Row>
                      <Col xs="6" md="6">
                        <Label htmlFor="company-name">Nama Perusahaan</Label>
                        <Input
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.name}
                          required
                          placeholder="Nama Perusahaan"
                        />
                      </Col>
                      <Col xs="6" md="6">
                        <Label htmlFor="field">Jenis Perusahaan</Label>
                        <Input
                          type="text"
                          name="field"
                          onChange={this.handleChange}
                          value={this.state.field}
                          required
                          placeholder="Jumlah"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col xs="12" md="12">
                        <Label htmlFor="unit">Alamat</Label>
                        <Input
                          type="textarea"
                          name="address"
                          onChange={this.handleChange}
                          value={this.state.address}
                          rows="3"
                          placeholder="Alamat"
                          required
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
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
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Perusahaan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Perusahaan</th>
                      <th>Jenis</th>
                      <th>Alamat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.companies.map((company, index) => (
                      <tr key={company._id}>
                        <td>{index + 1}</td>
                        <td>{company.name}</td>
                        <td>{company.field}</td>
                        <td>{company.address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            onClick={this.hapusClick.bind(this, company._id)}
                          >
                            Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            onClick={this.actionStatus.bind(this, company._id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Companies;
