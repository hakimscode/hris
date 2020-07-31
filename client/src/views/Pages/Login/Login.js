import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import Axios from "axios";
import { compareAsc } from "date-fns";
import JwtDecode from "jwt-decode";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      txt_username: "",
      txt_password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
      username: this.state.txt_username,
      password: this.state.txt_password,
    }).then((res) => {
      if (res.status === 201 && res.data.access_token) {
        const decodedToken = JwtDecode(res.data.access_token);
        localStorage.setItem("jwt-token-hris", res.data.access_token);
        localStorage.setItem("token-expired", decodedToken.exp.toString());
        alert("Berhasil Login");
        this.props.history.push("/");
      }
    });
  };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token-hris");

    const isTokenExpired = compareAsc(
      Math.floor(Date.now() / 1000),
      parseInt(localStorage.getItem("token-expired"))
    );

    if (jwt && isTokenExpired !== 1) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="txt_username"
                          onChange={this.handleChange}
                          value={this.state.txt_username}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="txt_password"
                          onChange={this.handleChange}
                          value={this.state.txt_password}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Human Resource Information System</h2>
                      <p>
                        Pengelola informasi karyawan pada yayasan Ubudiyah
                        Indonesia
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
