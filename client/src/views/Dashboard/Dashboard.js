import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <h5>
              <i>Human Resources System Information</i>
            </h5>
            <h1>UB ONTV Ubudiyah Indonesia</h1>
            <hr />
          </Col>
        </Row>
        {/* <Row>
          <Col xs="6" lg="6">
            <Col xs="12" lg="12">
              <Card className="text-white bg-info">
                <CardBody>
                  <div className="text-value">9.823</div>
                  <div>Jumlah Pegawai</div>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" lg="12">
              <Card className="text-white bg-success">
                <CardBody>
                  <div className="text-value">9.823</div>
                  <div>Jumlah Perusahaan</div>
                </CardBody>
              </Card>
            </Col>
          </Col>
          <Col xs="6" lg="6"></Col>
        </Row> */}
      </div>
    );
  }
}

export default Dashboard;
