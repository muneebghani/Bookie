import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { Card, Section } from "../components";
import {
  Row,
  Form,
  Input,
  Button,
  Upload,
  message,
  Modal,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { api } from "../util/api";
import { genre } from "../util/genre";
import { AuthContext } from "../service/authentication";
import { getUserBooks } from "../api/user";
import { Redirect } from "react-router-dom";

export const MyBooks = () => {
  const [backClrForSale, setBackClrForSale] = useState("white");
  const [colorForSale, setColorForSale] = useState("black");
  const [backClrForRent, setBackClrForRent] = useState("white");
  const [colorForRent, setColorForRent] = useState("black");
  const [_status,set_status] = useState({rent:false,sale:false , both:false})
  const [backClrForBoth, setBackClrForBoth] = useState("white");
  const [colorForBoth, setColorForBoth] = useState("black");

  const [modalVisbility, setModalVisbility] = useState(false);
  const { state } = useContext(AuthContext);
  const fileRef = useRef(null);

  const triggerModal = () => setModalVisbility(!modalVisbility);

  const modal = (
    <Modal
      title="Add Book"
      visible={modalVisbility}
      onOk={() => {}}
      onCancel={triggerModal}
      okButtonProps={{ disabled: true }}
      footer={null}
    >
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        size="middle"
        onFinish={async (data) => {

          if (!fileRef.current) return message.error("please select a file");
          data.image = fileRef.current;
          data.date = data.date.toString();
          console.log(data,"<<<<---- data here");
          data.rent=_status.rent
          data.sale=_status.sale;
          data.both=_status.both;
          const params = Object.keys(data).reduce((acc, key) => {
            // console.log(key,acc, data ,"key acc data ")
            acc.append(key, data[key]);
            console.log(acc,"acc console here")
            return acc;
          }, new FormData());

          console.log(params,"params data is here ")

          const response = await api.post("/user/books", params, {
            headers: {
              "Content-Type": "multipart/form-data",
              auth: state.token,
            },
          });

          if (response.data.success) {
            message.success("book added successfully");
            fetchbooks();
            triggerModal();
          } else {
            message.error(response.data.error.message);
          }

          console.log(response.data,"response data here");
        }}
      >
        <Form.Item label="Title" name="title" required>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" required>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Edition" name="edition" required>
          <Input />
        </Form.Item>
        <Form.Item label="Date" name="date" required>
          <DatePicker format={"YYYY/MM/DD"} />
        </Form.Item>
        <Form.Item label="Publisher" name="publisher" required>
          <Input />
        </Form.Item>
        <Form.Item label="Genre" name="genre" required>
          <Select>
            {genre.map((el) => (
              <Select.Option value={el.title}>{el.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Pages" name="numberOfPages" required>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Price" name="price" required>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Rent Per Day" name="rentPrice" required>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" required>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Status" name="status" required>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <p
              name="sale"
            
              onClick={() => {
                setBackClrForRent("white");
                setColorForRent("black");
                setBackClrForSale("black");
                setColorForSale("white");
                setBackClrForBoth("white");
                setColorForBoth("black");
                set_status({rent:false,sale:true, both:false})
              }}
              style={{
                textAlign: "center",
                margin: "auto",
                width: "100px",
                border: "1px solid black",
                borderRadius: "18px",
                backgroundColor: backClrForSale,
                color: colorForSale,
                cursor: "pointer",
              }}
            >
              Sale
            </p>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p
              name="rent"
              onClick={() => {
                setBackClrForSale("white");
                setColorForSale("black");
                setBackClrForRent("black");
                setColorForRent("white");
                setBackClrForBoth("white");
                setColorForBoth("black");
                set_status({rent:true,sale:false , both:false})
              }}
              style={{
                textAlign: "center",
                margin: "auto",
                marginTop: "auto",
                width: "100px",
                border: "1px solid black",
                borderRadius: "18px",
                backgroundColor: backClrForRent,
                color: colorForRent,
                cursor: "pointer",
              }}
            >
              Rent
            </p>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <p
              name="both"
              onClick={() => {
                setBackClrForSale("white");
                setColorForSale("black");
                setBackClrForRent("white");
                setColorForRent("black");
                setBackClrForBoth("black");
                setColorForBoth("white");
                set_status({rent:false ,sale:false , both:true})
              }}
              style={{
                textAlign: "center",
                margin: "auto",
                marginTop: "auto",
                width: "100px",
                border: "1px solid black",
                borderRadius: "18px",
                backgroundColor: backClrForBoth,
                color: colorForBoth,
                cursor: "pointer",
              }}
            >
              Both
            </p>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;


          </div>
        </Form.Item>
        <Form.Item label="Book Cover">
          <Upload
            onChange={({ file }) => {
              console.log(file);
              fileRef.current = file.originFileObj;
            }}
            name="image"
          >
            <Button
              style={{
                color: "rgba(0, 0, 0, 0.65)",
              }}
            >
              <UploadOutlined /> Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add book
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
  const authContext = useContext(AuthContext);

  const fetchbooks = async () => {
    const response = await getUserBooks(authContext.state.user._id);
    console.log(response.data);

    if (response.data.success) {
      authContext.dispatch({
        type: authContext.ActionTypes.SET_MYBOOKS,
        payload: response.data.books,
      });
    }
  };

  const deleteBook = async (id) => {};

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="heading-large primary">My Books</p>
          <div>
            <Button onClick={triggerModal} size="large">
              Add Book
            </Button>
          </div>
        </div>
        <Section>
          <Row>
            {authContext.state.books.map((book) => {
              return <Card key={book._id} deletable={true} {...book} />;
            })}
          </Row>
          {modal}
        </Section>
      </Fragment>
    );
  }
};
