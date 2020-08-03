import React, { useContext, useState } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";

import { Link } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../service/authentication";
import { signin } from "../api/user";

const SignInGrid = {
  xs: 22,
  sm: 20,
  md: 16,
  lg: 11,
};

export const SignIn = () => {
  const [redirect, setRedirect] = useState(false);

  const authContext = useContext(AuthContext);
  const login = async (data) => {
    const response = await signin(data);
    console.log(data, response.data);
    if (response.data.success) {
      message.success("login sucessfull");
      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      setRedirect(true);
    } else {
      message.error(response.data.error.message);
    }
  };

  if (redirect || authContext.state.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Row className="page" justify="center" align="middle">
        <Col {...SignInGrid}>
          <Form
            size="large"
            onFinish={(data) => {
              login(data);
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
};
