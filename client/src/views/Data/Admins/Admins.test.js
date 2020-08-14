import React from "react";
import ReactDOM from "react-dom";
import Admins from "./Admins";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Admins />, div);
  ReactDOM.unmountComponentAtNode(div);
});
