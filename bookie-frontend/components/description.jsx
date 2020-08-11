import React, { useContext, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { Row, Col, message, Button, Layout } from "antd";
import { Genre } from "./";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleFilled,
  MinusCircleFilled,
  DeleteFilled,
} from "@ant-design/icons";

import "./description.css";
import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { CartContext } from "../service/cart";
import { Descipofbooks } from './description';

const CardGrid = {};
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export const Desbook = ({
  _id,
  title,
  author,
  genre,
  image,
  price,
  rentPrice,
  quantity,
  description,
}) => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);


  return (
  	<Fragment>
    <Col {...CardGrid}>
      <div className="book-card">
        <div
          className="image"
          style={{
            backgroundPosition: "center",
            backgroundImage: `url('${BASE_URL + "/" + image}')`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </Col>
    <div className="body">
        	<Row>
        		<Col>
          			<p className="heading-primary primary"> {title}</p>
          		</Col></Row>
          		<Row>
          		<Col>
          			<p className="text-primary primary-faded ">{author}</p>
          		</Col></Row>
          		<Row>
          		<Col>
          			<p className="text-primary primary-faded ">
            		Price: <span className="heading-primary primary">{price}</span>
          			</p>
          		</Col></Row>
          		<Row>
          		<Col>
          			<p className="text-primary primary-faded  ">
            		Rent/Day: <span className="heading-primary primary">{rentPrice}</span>
          			</p>
          		</Col></Row>
          		<Row>
          		<Col>
          			<p className="text-primary primary-faded ">
            		Quantity: <span className="heading-primary primary">{quantity}</span>
          			</p>
          		</Col></Row>
          		<Row>
          		<Col >
          			<p className="text-primary primary-faded ">
            		Description: <span className="heading-primary primary">{description}</span>
          			</p>
          		</Col></Row>
          	<Row>
          		<div>
            		<Genre {...genre} />
          		</div>
          	</Row>
        </div>
        </Fragment>
  );
};
