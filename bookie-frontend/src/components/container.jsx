import React from "react";

import { Row, Col } from "antd";

const ContainerGrid = {
  sm: 23,
  md: 23,
  lg: 23,
};

export const Container = ({ children, classes }) => {
  return (
    <Row className={classes} justify="center">
      <Col {...ContainerGrid}>{children}</Col>
    </Row>
  );
};
