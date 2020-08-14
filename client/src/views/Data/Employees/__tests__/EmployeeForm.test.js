import React from "react";
import ReactDOM from "react-dom";
import EmployeeForm from "../EmployeeForm";

it("renders without crashing", () => {
  const props = {
    match: {
      params: { employeeId: "5f2009775971ff2bfbee82d5" },
      url: "/add",
    },
  };
  const div = document.createElement("div");
  ReactDOM.render(<EmployeeForm {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
