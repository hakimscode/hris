import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import currencyFormat from "../../../shared/currencyFormat";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../../Widgets/LoadingIndicator";

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/employees";

    this.employeeId = this.props.match.params.employeeId;

    this.state = {
      company: {},
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
    };
  }

  componentDidMount() {
    const employeeId = this.employeeId;

    trackPromise(
      axios
        .get(this.API_URL + "/" + employeeId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          const company = res.data.data.company;
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
            company,
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
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Data tidak ada");
          this.props.history.push("/data/employees");
        })
    );
  }

  hapusClick = (employeeId) => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      trackPromise(
        axios
          .delete(this.API_URL + "/" + employeeId, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          })
          .then(() => {
            alert("Data berhasil dihapus");
            this.props.history.push("/data/employees");
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
                <i className="fa fa-align-justify"></i>Data Pegawai
                <Button
                  size="sm"
                  color="danger"
                  className="float-right mb-0 ml-1"
                  onClick={this.hapusClick.bind(this, this.employeeId)}
                >
                  <i className="fa fa-trash"></i>&nbsp;Hapus
                </Button>
                <Link
                  to={`/data/employee/${this.employeeId}/edit`}
                  className="btn btn-sm btn-warning float-right mb-0"
                >
                  <i className="fa fa-pencil"></i>&nbsp;Edit
                </Link>
              </CardHeader>
              <CardBody>
                <Row className="p-2">
                  <Col xs="6" lg="6">
                    <ListGroup>
                      <ListGroupItem>
                        Cabang : <strong>{this.state.company.name}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        NIK : <strong>{this.state.idNumber}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Nama : <strong>{this.state.name}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Alamat : <strong>{this.state.address}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Jenis Kelamin : <strong>{this.state.gender}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Tempat Tanggal Lahir :{" "}
                        <strong>
                          {this.state.placeOfBirth}, {this.state.dateOfBirth}
                        </strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Status Kawin :{" "}
                        <strong>{this.state.maritalStatus}</strong>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs="6" lg="6">
                    <Row className="pb-2">
                      <Col xs="12" lg="12">
                        <ListGroup>
                          <ListGroupItem>
                            No HP : <strong>{this.state.phoneNumber}</strong>
                          </ListGroupItem>
                          <ListGroupItem>
                            Email : <strong>{this.state.email}</strong>
                          </ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row className="pt-1 pb-1">
                      <Col xs="12" lg="12">
                        <ListGroup>
                          <ListGroupItem>
                            Departemen :{" "}
                            <strong>{this.state.department}</strong>
                          </ListGroupItem>
                          <ListGroupItem>
                            Jabatan : <strong>{this.state.role}</strong>
                          </ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <Col xs="12" lg="12">
                        <ListGroup>
                          <ListGroupItem>
                            Gaji Utama :{" "}
                            <strong>
                              {currencyFormat.format(this.state.primarySalary)}
                            </strong>
                          </ListGroupItem>
                          <ListGroupItem>
                            Uang Harian :{" "}
                            <strong>
                              {currencyFormat.format(this.state.dailyAllowance)}
                            </strong>
                          </ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EmployeeDetail;
