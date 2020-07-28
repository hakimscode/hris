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
import { Link } from "react-router-dom";

class Employees extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5001/employees";
    this.API_URL_COMPANIES = "http://localhost:5001/companies";

    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    axios
      .get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        this.setState({ employees: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Pegawai
                <Link
                  to="/data/employee/add"
                  className="btn btn-sm btn-success float-right mb-0"
                >
                  <i className="fa fa-plus-circle"></i>&nbsp;Tambah
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Perusahaan</th>
                      <th>Nama Pegawai</th>
                      <th>Departemen</th>
                      <th>Jabatan</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.employees.map((employee, index) => (
                      <tr key={employee._id}>
                        <td>{index + 1}</td>
                        <td>{employee.company.name}</td>
                        <td>{employee.profile.name}</td>
                        <td>{employee.position.department}</td>
                        <td>{employee.position.role}</td>
                        <td>
                          <Link
                            to={`/data/employee/${employee._id}`}
                            className="btn btn-sm btn-info"
                          >
                            <i className="fa fa-info-circle"></i>&nbsp;Detail
                          </Link>
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

export default Employees;
