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
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../../Widgets/LoadingIndicator";

class Admins extends Component {
  constructor(props) {
    super(props);

    this.API_URL_ADMINS = process.env.REACT_APP_API_URL + "/users";
    this.API_URL_COMPANIES = process.env.REACT_APP_API_URL + "/companies";

    this.state = {
      admins: [],
      companies: [],

      username: "",
      password: "",
      userRole: "Admin Company",
      company: "",

      selectedId: "",
      actionSubmit: "Simpan",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    trackPromise(
      axios
        .get(this.API_URL_ADMINS + "/admins", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          this.setState({ admins: res.data.data });
        })
        .catch((err) => console.log(err))
    );

    trackPromise(
      axios
        .get(this.API_URL_COMPANIES, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          this.setState({ companies: res.data.data });
        })
        .catch((err) => console.log(err))
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hapusClick = (adminId) => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      trackPromise(
        axios
          .delete(this.API_URL_ADMINS + "/" + adminId, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          })
          .then(() => {
            this.setState({
              admins: [
                ...this.state.admins.filter((admin) => admin._id !== adminId),
              ],
            });
          })
          .catch((err) => console.log(err))
      );
    }
  };

  resetForm = () => {
    this.setState({
      username: "",
      password: "",
      company: "",
      selectedId: "",
      actionSubmit: "Simpan",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, userRole, company } = this.state;
    if (this.state.selectedId === "") {
      trackPromise(
        axios
          .post(
            this.API_URL_ADMINS,
            {
              username,
              password,
              userRole,
              company,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "jwt-token-hris"
                )}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 201) {
              this.setState({
                admins: [...this.state.admins, res.data.data],
              });
              this.resetForm();
            } else {
              console.log("error");
            }
          })
          .catch((err) => console.log(err))
      );
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <LoadingIndicator />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Admin
              </CardHeader>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardBody>
                  <FormGroup>
                    <Row>
                      <Col xs="4" md="4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                          value={this.state.username}
                          required
                          placeholder="Username"
                        />
                      </Col>
                      <Col xs="4" md="4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          required
                          placeholder="Password"
                        />
                      </Col>
                      <Col xs="4" md="4">
                        <Label htmlFor="company">Perusahaan</Label>
                        <Input
                          type="select"
                          name="company"
                          onChange={this.handleChange}
                          value={this.state.company}
                          required
                        >
                          <option value="">-- pilih perusahaan --</option>
                          {this.state.companies.map((company) => (
                            <option key={company._id} value={company._id}>
                              {company.name}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  </FormGroup>
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
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Admin
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Perusahaan</th>
                      <th>Username</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.admins.map((admin, index) => (
                      <tr key={admin._id}>
                        <td>{index + 1}</td>
                        <td>{admin.company.name}</td>
                        <td>{admin.username}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            onClick={this.hapusClick.bind(this, admin._id)}
                          >
                            <i className="fa fa-trash"></i>&nbsp;Hapus
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

export default Admins;
