import React from "react";
import ReactDOM from "react-dom";
import Allowances from "./Allowances";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Allowances />, div);
  ReactDOM.unmountComponentAtNode(div);
});
