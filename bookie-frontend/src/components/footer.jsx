import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
import { Row, Col } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  CopyrightOutlined,
  YoutubeFilled,
  LinkedinFilled,
} from "@ant-design/icons";

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <Row justify="center">             
                <Col>
                    <a><FacebookFilled style={{ fontSize: '35px', color: '#3b5998' , marginRight: '6px' }} /></a>
                    <a><InstagramFilled style={{ fontSize: '35px', color: '#FD1D1D', marginRight: '6px' }} /></a>
                    <a><TwitterOutlined style={{ fontSize: '35px', color: '#00acee', marginRight: '6px' }} /></a>
                    <a><YoutubeFilled style={{ fontSize: '35px', color: '#FF0000', marginRight: '6px' }} /></a>
                    <a><LinkedinFilled style={{ fontSize: '35px', color: '#0e76a8' }} /></a>
                </Col>
            </Row>
            <Row justify="center" className="mrg">             
                <Col>
                    <p><CopyrightOutlined /> Copyright 2020 Bookie</p>
                </Col>
            </Row>
        </div>
    </div>
    )
}

export default Footer;