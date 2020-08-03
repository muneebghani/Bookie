import React, { Fragment, useEffect, useContext, useState } from "react";
import { Section } from "../components";
import { Row, Table } from "antd";
import { AuthContext } from "../service/authentication";
import { getTransactions } from "../api/user";
import { Redirect } from "react-router-dom";

export const Transactions = () => {
  const authContext = useContext(AuthContext);
  const [type, setType] = useState("seller");

  const fetch = async () => {
    const response = await getTransactions(type, authContext.state.token);
    console.log(response.data.transactions);
    const data = response.data.transactions.map(({ book, buyer, seller }) => {
      return {
        buyer: `${buyer.username} | ${buyer.email}`,
        seller: `${seller.username} | ${seller.email}`,
        book: `${book.title} | ${book.price} Rs`,
      };
    });

    if (response.data.success) {
      authContext.dispatch({
        type: authContext.ActionTypes.SET_TRANSACTIONS,
        payload: data,
      });
    }
  };
  useEffect(() => {
    if (authContext.state.isAuthenticated) {
      fetch();
    }
  }, []);

  const columns = [
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
    },
    {
      title: "Book",
      dataIndex: "book",
      key: "book",
    },
  ];
  if (!authContext.state.isAuthenticated) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="heading-large primary">Recent Transactions</p>
        </div>
        <Section>
          <Row>
            <Table
              pagination={false}
              columns={columns}
              dataSource={authContext.state.transactions}
            />
          </Row>
        </Section>
      </Fragment>
    );
  }
};
