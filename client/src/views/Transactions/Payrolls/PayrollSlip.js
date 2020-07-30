import React, { Component } from "react";
import currencyFormat from "../../../shared/currencyFormat";
import { Col, Row, Table, ListGroup, ListGroupItem } from "reactstrap";

class PayrollSlip extends Component {
  render() {
    return (
      <div className="printBody">
        <style>
          {`@media print {
              .printBody { margin: 40px;}
            }

            @media screen {
              .headerPrint { display: none; }
              .footerPrint { display: none; }
            }
          `}
        </style>
        <Row className="headerPrint">
          <Col xs="12" lg="12">
            <h3 align="center">Slip Gaji</h3>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col xs="6" lg="6">
            <ListGroup>
              <ListGroupItem>
                Perusahaan :{" "}
                <strong>{this.props.data.employee.company.name}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Periode : <strong>{this.props.data.period}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Tanggal : <strong>{this.props.data.date}</strong>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs="6" lg="6">
            <ListGroup>
              <ListGroupItem>
                Nama Pegawai :{" "}
                <strong>{this.props.data.employee.profile.name}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Departemen :{" "}
                <strong>{this.props.data.employee.position.department}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Jabatan :{" "}
                <strong>{this.props.data.employee.position.role}</strong>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="4" lg="4">
            <Table responsive>
              <tbody>
                {this.props.data.benefitSalary.map((salaryItem, index) => (
                  <tr key={index + 1}>
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
                {this.props.data.cutSalary.map((salaryItem, index) => (
                  <tr key={index + 1}>
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
                      {currencyFormat.format(this.props.data.totalSalary)}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total Potongan</strong>
                  </td>
                  <td align="right">
                    <strong>
                      {currencyFormat.format(this.props.data.totalCuts)}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gaji Diterima</strong>
                  </td>
                  <td align="right">
                    <strong>
                      {currencyFormat.format(this.props.data.netSalary)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="footerPrint pt-4">
          <Col xs="12" lg="12">
            <div align="right">
              <p>Mengetahui,</p>
              <br />
              <br />
              <br />
              <p>HRD {this.props.data.employee.company.name}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PayrollSlip;
