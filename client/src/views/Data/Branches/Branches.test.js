import React from "react";
import ReactDOM from "react-dom";
import Branches from "./Branches";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Branches />, div);
  ReactDOM.unmountComponentAtNode(div);
});
