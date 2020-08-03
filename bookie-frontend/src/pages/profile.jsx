import React, { useRef, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Upload, message } from "antd";

import { Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { api } from "../util/api";
import { AuthContext } from "../service/authentication";

const SignUpGrid = {
  xs: 22,
  sm: 20,
  md: 16,
  lg: 10,
};

export const Profile = () => {
  const { username, email, password } = useContext(AuthContext).state.user;
  const fileRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        paddingTop: "10rem",
      }}
    >
      <Col {...SignUpGrid}>
        <Form
          size="large"
          onFinish={async (data) => {
            if (!fileRef.current) return message.error("please select a file");
            data.image = fileRef.current;
            delete data.confirmPassword;

            const params = Object.keys(data).reduce((acc, key) => {
              acc.append(key, data[key]);
              return acc;
            }, new FormData());

            const response = await api.post("/user/signup", params, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (response.data.success) {
              message.success("Profile settings changes successfully");
            } else {
              message.error(response.data.error.message);
            }

            console.log(response.data);
          }}
        >
          <Form.Item
            // valuePropName={username}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              value={username}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            // valuePropName={email}
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
            <Input
              value={email}
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            // valuePropName={password}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              value={password}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Cofirm Password"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Upload
              onChange={({ file }) => {
                console.log(file);
                fileRef.current = file.originFileObj;
              }}
              name="image"
            >
              <Button
                style={{
                  color: "#fff",
                }}
              >
                <UploadOutlined /> Upload Avatar
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                marginRight: "2rem",
              }}
            >
              Change Profile Settings
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
