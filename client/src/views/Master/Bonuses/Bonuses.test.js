import React from "react";
import ReactDOM from "react-dom";
import Bonuses from "./Bonuses";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Bonuses />, div);
  ReactDOM.unmountComponentAtNode(div);
});
