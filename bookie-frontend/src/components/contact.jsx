import React, { Fragment } from "react";
import { Button, Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  WhatsAppOutlined,
  PhoneFilled,
  MailOutlined,
  MailFilled,
  FacebookFilled,
} from "@ant-design/icons";
import './contact.css';

function Contact(props)  {
    return(
        <Fragment>
      <div>
        <p className="heading-large primary">Contact Us</p>
      </div>
      <Divider></Divider>
            <Row>
                <Col>
                <h2 className="primary"><strong>Location Information</strong></h2>
                </Col>
            </Row>
                <Row>
                    <Col>
                        <h3 className="primary"><strong>Our Address</strong></h3>
                        <address>
                        31km off Defence Road, <br/>
                        Raiwind Road, <br/>
                        Lahore, Punjab,<br />
                        Pakistan<br />
                        <a><PhoneFilled /><a href="tel:034759374898"> <strong>034759374898</strong></a><br /></a>
                        <a><MailFilled /><a href="mailto:Bookie@edu.pk"> <strong>Bookie@edu.pk</strong></a></a>
                        </address>
                </Col>
                    <Divider type="vertical"></Divider>
                <Col style={{ display: 'flex', marginLeft: '20%', alignItems: 'center', justifyContent: 'center' }} >
                        <a><a href="tel:090078601"><WhatsAppOutlined style={{ fontSize: '58px', color: '#4FCE5D' , marginRight: '18px' }}/> </a></a>
                        <a><a href="https://www.facebook.com/bookie"><FacebookFilled style={{ fontSize: '58px', color: '#3b5998' , marginRight: '18px' }} /> </a></a>
                        <a><a href="mailto:Bookie@edu.pk"><MailOutlined style={{ fontSize: '58px', color: '#c71610' , marginRight: '18px' }} /> </a></a>
                </Col>
            </Row>
            <Divider></Divider>
            {/* <Row justify="center"> */}
            {/*     <Col> */}
            {/*         <h2 className="primary"><strong>Map of our Location</strong></h2> */}
            {/*             <Map */}
            {/*                 id="myMap" */}
            {/*                 options={{ */}
            {/*                 center: { lat: 41.0082, lng: 28.9784 }, */}
            {/*                 zoom: 8 */}
            {/*                 }} */}
            {/*                 onMapLoad={map => { */}
            {/*                 var marker = new window.google.maps.Marker({ */}
            {/*                 position: { lat: 41.0082, lng: 28.9784 }, */}
            {/*                 map: map, */}
            {/*                 title: 'Bookie' */}
            {/*                         }); */}
            {/*                     }} */}
            {/*                 /> */}
            {/*     </Col> */}
            {/* </Row> */}
    </Fragment>
);
}

export default Contact;