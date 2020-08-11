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
      console.log(booksState.state.books)
    }
  };

  useEffect(() => {
    fetch();
    console.log(booksState)
  }, []);
  return (
    <Fragment>
      <div>
        <p className="heading-large primary">Browse Books By Sale</p>
      </div>
      <Section>
        <Row>
          {booksState.state.books.filter(book=>  (!book.rent || book.both)).map((book) => (
            <Card key={book._id} {...book}  rent='false' />
          ))}
        </Row>
      </Section>
    </Fragment>
  );
};
