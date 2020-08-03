import React, { Fragment, useEffect, useState } from "react";
import { Card, Section } from "../components";
import { Row, Carousel, Tag } from "antd";
import { getAllBooks } from "../api/user";
import '../components/home.css';

export const Home = () => {
  const [booksData, setBooksData] = useState([]);

  const fetchbooks = async () => {
    const response = await getAllBooks();
    // console.log(response.data);
    if (response.data) {
      setBooksData(response.data);
    }
  };
  useEffect(() => {
    fetchbooks();
  }, []);

  return (
    <Fragment>
      <div>
      <Carousel className="mycarousel" dotPosition="left" autoplay effect="fade">
    <div>
      <Tag color="blue">Welcome to bookie</Tag>
      <img src="/assets/images/book1.jpg" alt="book1" width="100%" height="400" />
    </div>
    <div>
      <Tag color="red">Welcome to bookie</Tag>
      <img src="/assets/images/book2.jpg" alt="book1" width="100%" height="400" />
    </div>
    <div>
      <Tag color="purple">Welcome to bookie</Tag>
      <img src="/assets/images/book3.jpg" alt="book1" width="100%" height="400" />
    </div>
    <div>
      <Tag color="orange">Welcome to bookie</Tag>
      <img src="/assets/images/book6.jpg" alt="book1" width="100%" height="400" />
    </div>
  </Carousel>
</div>
      <div>
        <p className="heading-large primary">Top Selling Books</p>
      </div>
      <Section>
        <Row>
          {booksData.map((book) => {
            return <Card key={book._id} deletable={false} {...book}  />;
          })}
        </Row>
        {/* {modal} */}
      </Section>
    </Fragment>
  );
};
