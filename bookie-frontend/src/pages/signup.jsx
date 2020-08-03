import React, { useRef, useContext } from "react";
import { Row, Col, Form, Input, Button, Upload, message } from "antd";

import { Link, useHistory } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { api } from "../util/api";
import { AuthContext, ActionTypes } from "../service/authentication";

const SignUpGrid = {
  xs: 22,
  sm: 20,
  md: 16,
  lg: 14,
};

export const SignUp = () => {
  const fileRef = useRef(null);

  const history = useHistory();

  return (
    <Row className="page" justify="center" align="middle">
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
              message.success("user registered successfully");
              history.push("/");
            } else {
              message.error(response.data.error.message);
            }

            console.log(response.data);
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

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

          <Row>
            <Col span={11} >
              <Form.Item
                name="country"
                rules={[
                {
                required: true,
                message: "Please enter your country name!",
                },
             ]}
            >
            <Input
              prefix={ <InfoCircleOutlined  /> }
              type="country"
              placeholder="Country"
            />
          </Form.Item>
          </Col>

          <Col span={12} style={{marginLeft: 'auto'}} >
          <Form.Item
            name="zipcode"
            rules={[
              {
                required: true,
                message: "Please enter your Zip/Postal Code!",
              },
            ]}
          >
            <Input
              prefix={ <InfoCircleOutlined  /> }
              type="zipcode"
              placeholder="Zip Code"
            />
          </Form.Item>
        </Col>

          <Col span={11}>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city name!",
              },
            ]}
          >
            <Input
              prefix={ <InfoCircleOutlined /> }
              type="city"
              placeholder="City"
            />
          </Form.Item>
        </Col>
          <Col span={12} style={{marginLeft: 'auto'}} >
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
              prefix={ <InfoCircleOutlined /> }
              type="address"
              placeholder="Address"
            />
          </Form.Item>
        </Col>
      </Row>
        
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
              Register
            </Button>
            Already have an account? <Link to="/signin">Sign in</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
