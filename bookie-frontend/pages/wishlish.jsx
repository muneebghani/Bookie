import React, { Fragment, useEffect, useContext } from "react";
import { Card, Section } from "../components";
import { Row } from "antd";
import { Redirect } from "react-router-dom";
import { ActionTypes, BooksContext } from "../service/books";

import { getWishlist } from "../api/user";
import { AuthContext } from "../service/authentication";

export const Wishlist = () => {
  const authContext = useContext(AuthContext);

  const fetchbooks = async () => {
    const response = await getWishlist(authContext.state.token);

    if (response.data.success) {
      authContext.dispatch({
        type: authContext.ActionTypes.SET_WISHLIST,
        payload: response.data.wishlist,
      });
    }
  };

  useEffect(() => {
    if (authContext.state.isAuthenticated) {
      fetchbooks();
    }
  }, []);
  if (!authContext.state.isAuthenticated) {
    return <Redirect to="/signin" />;
  } else if (authContext.state.isAuthenticated) {
    return (
      <Fragment>
        <div>
          <p className="heading-large primary">Favourites</p>
        </div>
        <Section>
          <Row>
            {authContext.state.user.wishlist.map((book) => {
              console.log("ye hai", book);
              return <Card key={book._id} {...book} />;
            })}
          </Row>
        </Section>
      </Fragment>
    );
  }
};
