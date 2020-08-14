import React from "react";
import ReactDOM from "react-dom";
import PayrollForm from "../PayrollForm";
import { HashRouter, Switch, Route } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route
          key="1"
          path="transactions/payroll/add"
          exact={true}
          name="Payroll Form"
          render={(props) => <PayrollForm {...props} />}
        />
      </Switch>
    </HashRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
