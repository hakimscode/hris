import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Table,
  // Button,
} from "reactstrap";
import axios from "axios";
import currencyFormat from "../../../shared/currencyFormat";
// import { Link } from "react-router-dom";

class PayrollDetail extends Component {
  constructor(props) {
    super(props);

    this.API_URL = "http://localhost:5001/payrolls";

    this.payrollId = this.props.match.params.payrollId;

    this.state = {
      period: "",
      date: "",
      benefitSalary: [
        {
          name: "",
          amount: 0,
        },
      ],
      cutSalary: [
        {
          name: "",
          amount: 0,
        },
      ],
      employee: {
        company: { name: "" },
        profile: { name: "" },
        position: { department: "", role: "" },
      },

      totalSalary: 0,
      totalCuts: 0,
      netSalary: 0,
    };
  }

  componentDidMount() {
    const payrollId = this.payrollId;

    axios
      .get(this.API_URL + "/" + payrollId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
        },
      })
      .then((res) => {
        const {
          period,
          date,
          benefitSalary,
          cutSalary,
          employee,
        } = res.data.data;

        const totalSalary = benefitSalary.reduce(
          (prev, curr) => prev + (curr["amount"] || 0),
          0
        );

        const totalCuts = cutSalary.reduce(
          (prev, curr) => prev + (curr["amount"] || 0),
          0
        );

        const netSalary = totalSalary - totalCuts;

        this.setState({
          period,
          date,
          benefitSalary,
          cutSalary,
          employee,
          totalSalary,
          totalCuts,
          netSalary,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Data tidak ada");
        this.props.history.push("/data/payrolls");
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Data Payroll
                {/* <Button
                  size="sm"
                  color="danger"
                  className="float-right mb-0 ml-1"
                  onClick={this.hapusClick.bind(this, this.payrollId)}
                >
                  <i className="fa fa-trash"></i>&nbsp;Hapus
                </Button>
                <Link
                  to={`/data/payroll/${this.payrollId}/edit`}
                  className="btn btn-sm btn-warning float-right mb-0"
                >
                  <i className="fa fa-pencil"></i>&nbsp;Edit
                </Link> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="6" lg="6">
                    <ListGroup>
                      <ListGroupItem>
                        Perusahaan :{" "}
                        <strong>{this.state.employee.company.name}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Periode : <strong>{this.state.period}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Tanggal : <strong>{this.state.date}</strong>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs="6" lg="6">
                    <ListGroup>
                      <ListGroupItem>
                        Nama Pegawai :{" "}
                        <strong>{this.state.employee.profile.name}</strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Departemen :{" "}
                        <strong>
                          {this.state.employee.position.department}
                        </strong>
                      </ListGroupItem>
                      <ListGroupItem>
                        Jabatan :{" "}
                        <strong>{this.state.employee.position.role}</strong>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
                <Row className="pt-4">
                  <Col xs="4" lg="4">
                    <Table responsive>
                      <tbody>
                        {this.state.benefitSalary.map((salaryItem) => (
                          <tr>
                            <td>{salaryItem.name}</td>
                            <td align="right">
                              {currencyFormat.format(salaryItem.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="4" lg="4">
                    <Table responsive>
                      <tbody>
                        {this.state.cutSalary.map((salaryItem) => (
                          <tr>
                            <td>{salaryItem.name}</td>
                            <td align="right">
                              {currencyFormat.format(salaryItem.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="4" lg="4">
                    <Table responsive>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Total Gaji</strong>
                          </td>
                          <td align="right">
                            <strong>
                              {currencyFormat.format(this.state.totalSalary)}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total Potongan</strong>
                          </td>
                          <td align="right">
                            <strong>
                              {currencyFormat.format(this.state.totalCuts)}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Gaji Diterima</strong>
                          </td>
                          <td align="right">
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
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PayrollDetail;
