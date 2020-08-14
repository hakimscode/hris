import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route } from "react-router-dom";
import DefaultLayout from "../DefaultLayout";

it("renders without crashing", () => {
  localStorage.setItem(
    "jwt-token-hris",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWY0Y2NmNDhmOGZiYTkxYjU3MTkzZDYiLCJ1c2VybmFtZSI6ImFkbWluIiwidXNlclJvbGUiOiJBZG1pbiIsImNvbXBhbnkiOm51bGwsImlhdCI6MTU5NzM1ODY5NywiZXhwIjoxNTk3NDQ1MDk3fQ.T3JQd0MGpqY8wLDHKGupqQwODGHZpTB_s9ihjJHk9wI"
  );
  localStorage.setItem("token-expired", "2020-10-10");
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Route path="/" name="Home" component={DefaultLayout} />
    </MemoryRouter>,
    div
  );
  localStorage.removeItem("jwt-token-hris");
  localStorage.removeItem("token-expired");
  ReactDOM.unmountComponentAtNode(div);
});
