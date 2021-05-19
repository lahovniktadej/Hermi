import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";

function Main() {
    <div className="main-container">
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Redirect to="/" />
        </Switch>
    </div>
}

export default Main;