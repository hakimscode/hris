import React from "react";
import ReactDOM from "react-dom";
import EmployeeDetail from "../EmployeeDetail";
import { HashRouter, Switch, Route } from "react-router-dom";

it("renders employee detail without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route
          key="1"
          path="data/employee/:employeeId"
          exact={true}
          name="Employee Detail"
          render={(props) => <EmployeeDetail {...props} />}
        />
      </Switch>
    </HashRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
