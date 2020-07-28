import { Component } from "react";
import { withRouter } from "react-router-dom";
import { compareAsc } from "date-fns";

export class AuthenticatedComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: "",
        nama_lengkap: "",
        username: "",
      },
      username: null,
      password: null,
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token-hris");

    const isTokenExpired = compareAsc(
      Math.floor(Date.now() / 1000),
      parseInt(localStorage.getItem("token-expired"))
    );

    if (!jwt || isTokenExpired === 1) {
      this.props.history.push("/login");
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(AuthenticatedComponent);
