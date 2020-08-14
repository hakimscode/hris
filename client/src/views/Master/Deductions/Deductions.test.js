import React from "react";
import ReactDOM from "react-dom";
import Deductions from "./Deductions";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Deductions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
