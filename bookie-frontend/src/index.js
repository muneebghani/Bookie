import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignIn, SignUp } from "./pages";
import { AuthProvidor } from "./service/authentication";
import { BooksProvidor } from "./service/books";
import { CartProvidor } from "./service/cart";

ReactDOM.render(
  <AuthProvidor>
    <BooksProvidor>
      <CartProvidor>
        <Router>
          {/* <Switch>
            <Route exact path="/"> */}
          <App />
          {/* </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/register">
              <SignUp />
            </Route>

            <Route>{() => <h1>404 | Not Found</h1>}</Route>
          </Switch> */}
        </Router>
      </CartProvidor>
    </BooksProvidor>
  </AuthProvidor>,
  document.getElementById("root")
);
