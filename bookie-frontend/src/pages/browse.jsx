import React, { Fragment, useEffect, useContext } from "react";
import { Card, Section } from "../components";
import { Row } from "antd";
import { BooksContext } from "../service/books";
import { getAllBooks } from "../api/user";

export const Browse = () => {
  const booksState = useContext(BooksContext);

  const fetch = async () => {
    const response = await getAllBooks();
    console.log(response.data);
    if (response.data) {
      booksState.dispatch({
        type: booksState.ActionTypes.SET_BOOKS,
        payload: response.data,
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Fragment>
      <div>
        <p className="heading-large primary">Browse Books</p>
      </div>
      <Section>
        <Row>
          {booksState.state.books.map((book) => (
            <Card key={book._id} {...book} />
          ))}
        </Row>
      </Section>
    </Fragment>
  );
};
