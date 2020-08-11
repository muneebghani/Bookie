import React, { Fragment, useContext, useEffect ,useState } from "react";
import { Row, Col } from "antd";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "./service/authentication";
import "./app.css";
import Footer from './components/footer';
import About from './components/about';
import Contact from './components/contact';
import { Desbook } from './components/description';
import Admin from './pages/admin'

// components
import { Navbar, Sidebar, Container } from "./components";
import {
  SignIn,
  Browse,
  BrowseRent,
  SignUp,
  Home,
  MyBooks,
  Wishlist,
  Cart,
  Transactions,
  Profile,
} from "./pages";

function App() {
  const authContext = useContext(AuthContext);
  const [isAdmin , setIsAdmin] = useState(true);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (user && token) {
      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user,
          token,
        },
      });
    }
  }, []);

  return (
    <div className="app">
      {/* {!authContext.state.isAuthenticated && (
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/singin">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route>{() => <h1>404 | Not Found</h1>}</Route>
      </Switch>
       )} */}
        
      {
      (authContext.state.isAuthenticated ||
        !authContext.state.isAuthenticated) && (
        <Fragment>
          <Navbar />
          <Container>
            <Row gutter={30}>
              <Col flex="300px">
                <Sidebar />
              </Col>
              <Col flex="930px">
                <Switch>
                  <Route exact path="/signin">
                    <SignIn />
                  </Route>
                  <Route exact path="/register">
                    <SignUp />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/browse">
                    <Browse />
                  </Route>
                  <Route exact path="/browse-rent">
                    <BrowseRent />
                  </Route>
                  <Route exact path="/books">
                    <MyBooks />
                  </Route>
                  <Route exact path="/wishlist">
                    <Wishlist />
                  </Route>
                  <Route exact path="/AboutUs">
                    <About />
                  </Route>
                  <Route exact path="/ContactUs">
                    <Contact />
                  </Route>
                  <Route exact path="/bookdetail">
                  <Desbook />
                  </Route>
                  <Route exact path="/cart">
                    <Cart />
                  </Route>
                  <Route exact path="/transactions">
                    <Transactions />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route>{() => <h1>404 | Not Found</h1>}</Route>
                </Switch>
              </Col>
            </Row>
          </Container>
            <Footer />
        </Fragment>
      )
      }
    </div>
  );
}

export default App;
