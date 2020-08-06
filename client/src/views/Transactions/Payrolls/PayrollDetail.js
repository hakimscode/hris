import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import axios from "axios";
import ReactToPrint from "react-to-print";
import PayrollSlip from "./PayrollSlip";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../../Widgets/LoadingIndicator";

class PayrollDetail extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/payrolls";

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

    trackPromise(
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
          this.props.history.push("/transactions/payrolls");
        })
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <LoadingIndicator />
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Data Payroll
                <ReactToPrint
                  trigger={() => {
                    return (
                      <Button
                        size="sm"
                        className="btn btn-sm btn-success float-right mb-0"
                        title="Print"
                      >
                        <i className="fa fa-print"></i>
                      </Button>
                    );
                  }}
                  content={() => this.componentRef}
                />
              </CardHeader>
              <CardBody>
                <PayrollSlip
                  data={this.state}
                  ref={(el) => (this.componentRef = el)}
                ></PayrollSlip>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PayrollDetail;
