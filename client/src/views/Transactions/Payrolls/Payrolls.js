import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import currencyFormat from "../../../shared/currencyFormat";

class Payrolls extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/payrolls";

    this.state = {
      payrolls: [],
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
        this.setState({ payrolls: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  countSalary = (payroll, isNet) => {
    const benefitTotal = payroll.benefitSalary.reduce(
      (prev, curr) => prev + (curr["amount"] || 0),
      0
    );

    const cutTotal = isNet
      ? payroll.cutSalary.reduce(
          (prev, curr) => prev + (curr["amount"] || 0),
          0
        )
      : 0;

    const salaryTotal = benefitTotal - cutTotal;

    return currencyFormat.format(salaryTotal);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Payrolls
                <Link
                  to="/transactions/payroll/add"
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
                      <th>Periode</th>
                      <th>Tanggal</th>
                      <th>Perusahaan</th>
                      <th>Departemen</th>
                      <th>Pegawai</th>
                      <th>Total Gaji</th>
                      <th>Gaji Diterima</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.payrolls.map((payroll, index) => (
                      <tr key={payroll._id}>
                        <td>{index + 1}</td>
                        <td>{payroll.period}</td>
                        <td>{payroll.date}</td>
                        <td>{payroll.employee.company.name}</td>
                        <td>{payroll.employee.position.department}</td>
                        <td>{payroll.employee.profile.name}</td>
                        <td>{this.countSalary(payroll, false)}</td>
                        <td>{this.countSalary(payroll, true)}</td>
                        <td>
                          <Link
                            to={`/transactions/payroll/${payroll._id}`}
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

export default Payrolls;
