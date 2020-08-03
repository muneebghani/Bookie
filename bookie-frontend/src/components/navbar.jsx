import React, { useContext } from "react";
import { Container } from "./";
import { Row, Avatar, Col, Menu, Dropdown, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../service/authentication";
import { BASE_URL } from "../util/api";

const Search = Input.Search;
const NavbarGrid = {
  logo: {
    xs: 8,
    sm: 8,
    md: 6,
    lg: 6,
  },
  search: {
    xs: 24,
    sm: 24,
    md: 8,
    lg: 8,
  },
  profile: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
  },
};

export const Navbar = () => {
  const authContext = useContext(AuthContext);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">
          <a>Edit profile</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/cart">
            <a>Cart</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>

      {/* <Menu.Divider />
    <Menu.Item key="4">4rd menu item</Menu.Item> */}
    </Menu>
  );

  function handleLogout() {
    authContext.dispatch({
      type: authContext.ActionTypes.LOGOUT,
    });
    window.location.reload();
  }

  return (
    <Container classes="navbar">
      <Row>
        <Col offset={1} style={{ marginRight: "auto", marginTop: "1px" }}>
                <div className="nav-action">
                  <Link to="/">
                    <img src='assets/images/logo.png' height="90" width="147" alt="Bookie" />
                  </Link>
                </div>
              </Col>
        <Col flex="250px"></Col>
        <Col flex="auto">
          <Row>
              <Col {...NavbarGrid.search} >
                  <Search
                    placeholder="Search Books..."
                    style={{ width: 350, height: 40 }}
                    onSearch={value => console.log(value)}
                  />
              </Col>
            {!authContext.state.isAuthenticated && (
              <Col style={{ marginTop: "8px", marginLeft: "auto" }} {...NavbarGrid.profile} >
                <div className="nav-action">
                  <Link to="/signin">
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                      className="text-primary"
                    >
                      Sign In
                    </p>
                  </Link>
                </div>
              </Col>

            )}
            <div><h4 style={{ marginTop: "14px", marginLeft: "6px" }} >||</h4> </div>
            {!authContext.state.isAuthenticated && (
              <Col style={{ marginTop: "10px", marginLeft: "auto" }} >
                <div className="nav-action">
                  <Link to="/register">
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                      className="text-primary"
                    >
                      Sign Up
                    </p>
                  </Link>
                </div>
              </Col>
            )}
            {authContext.state.isAuthenticated && (
              <Col style={{ marginTop: "8px", marginLeft: "auto" }} {...NavbarGrid.profile}>
                <div className="nav-action">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        size="large"
                        src={BASE_URL + "/" + authContext.state.user.image}
                      />{" "}
                      &nbsp;
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                        className="text-primary"
                      >
                        {authContext.state.user.username}
                      </span>{" "}
                      <DownOutlined />
                    </a>
                  </Dropdown>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
