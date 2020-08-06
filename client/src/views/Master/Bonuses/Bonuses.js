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

class Bonuses extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL + "/salary-components";

    this.state = {
      bonuses: [],

      componentName: "",
      componentType: "Bonus",
      amount: 0,
      decimalUnit: "rupiah",
      isAdders: true,

      selectedId: "",
      actionSubmit: "Simpan",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    trackPromise(
      axios
        .get(this.API_URL, {
          params: { componentType: this.state.componentType },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
          },
        })
        .then((res) => {
          this.setState({ bonuses: res.data.data });
        })
        .catch((err) => console.log(err))
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  actionStatus = (bonusId) => {
    if (bonusId !== "") {
      trackPromise(
        axios
          .get(this.API_URL + "/" + bonusId, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          })
          .then((res) => {
            this.setState({
              selectedId: bonusId,
              componentName: res.data.data.componentName,
              amount: res.data.data.amount,
              decimalUnit: res.data.data.decimalUnit ? "rupiah" : "persen",
              actionSubmit: "Edit",
            });
          })
          .catch((err) => console.log(err))
      );
    } else {
      this.resetForm();
    }
  };

  hapusClick = (bonusId) => {
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      trackPromise(
        axios
          .delete(this.API_URL + "/" + bonusId, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt-token-hris")}`,
            },
          })
          .then(() => {
            this.setState({
              bonuses: [
                ...this.state.bonuses.filter((bonus) => bonus._id !== bonusId),
              ],
            });
          })
          .catch((err) => console.log(err))
      );
    }
  };

  resetForm = () => {
    this.setState({
      componentName: "",
      amount: 0,
      decimalUnit: "",
      selectedId: "",
      actionSubmit: "Simpan",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.selectedId === "") {
      trackPromise(
        axios
          .post(
            this.API_URL,
            {
              componentName: this.state.componentName,
              componentType: this.state.componentType,
              amount: parseInt(this.state.amount),
              decimalUnit: this.state.decimalUnit === "rupiah" ? true : false,
              isAdders: this.state.isAdders,
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
                bonuses: [...this.state.bonuses, res.data.data],
              });
              this.resetForm();
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log(err.message);
            console.log(this.state);
          })
      );
    } else {
      trackPromise(
        axios
          .patch(
            this.API_URL + "/" + this.state.selectedId,
            {
              componentName: this.state.componentName,
              amount: parseInt(this.state.amount),
              decimalUnit: this.state.decimalUnit === "rupiah" ? true : false,
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
            if (res.status === 202) {
              this.setState({
                bonuses: this.state.bonuses.map((bonus) => {
                  if (bonus._id === res.data.data._id) {
                    bonus.componentName = res.data.data.componentName;
                    bonus.componentType = res.data.data.componentType;
                    bonus.amount = res.data.data.amount;
                    bonus.decimalUnit = res.data.data.decimalUnit
                      ? "rupiah"
                      : "persen";
                    bonus.isAdders = res.data.data.isAdders;
                  }
                  return bonus;
                }),
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
                <i className="fa fa-align-justify"></i> Form Bonus
              </CardHeader>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardBody>
                  <FormGroup>
                    <Row>
                      <Col xs="6" md="6">
                        <Label htmlFor="bonus-name">Nama Bonus</Label>
                        <Input
                          type="text"
                          name="componentName"
                          onChange={this.handleChange}
                          value={this.state.componentName}
                          required
                          placeholder="Nama Bonus"
                        />
                      </Col>
                      <Col xs="4" md="4">
                        <Label htmlFor="amount">Jumlah</Label>
                        <Input
                          type="number"
                          name="amount"
                          onChange={this.handleChange}
                          value={this.state.amount}
                          required
                          placeholder="Jumlah"
                        />
                      </Col>
                      <Col xs="2" md="2">
                        <Label htmlFor="unit">Satuan</Label>
                        <Input
                          type="select"
                          name="decimalUnit"
                          onChange={this.handleChange}
                          value={this.state.decimalUnit}
                          required
                        >
                          <option value="rupiah">Rp</option>
                          <option value="persen">%</option>
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
                <i className="fa fa-align-justify"></i> Data Bonus
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Bonus</th>
                      <th>Jumlah</th>
                      <th>Satuan</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.bonuses.map((bonus, index) => (
                      <tr key={bonus._id}>
                        <td>{index + 1}</td>
                        <td>{bonus.componentName}</td>
                        <td>{bonus.amount}</td>
                        <td>{bonus.decimalUnit ? "Rp" : "%"}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 mr-1"
                            onClick={this.hapusClick.bind(this, bonus._id)}
                          >
                            <i className="fa fa-trash"></i>&nbsp;Hapus
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="mb-2 mr-1"
                            onClick={this.actionStatus.bind(this, bonus._id)}
                          >
                            <i className="fa fa-pencil"></i>&nbsp;Edit
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

export default Bonuses;
