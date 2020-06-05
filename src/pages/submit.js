import React from "react";
// import { Link } from "gatsby"
import { Form, Input, Button, Select } from "antd";
import firebase from 'firebase';

import "./index.css";

import Header from "../components/header";

function SubmitPage() {
  const states = ["All States", "CA", "WA", "NY"]
  const cities = ["All Cities", "Seattle", "Washington", "New York"]
  const topics = ["All", "Black Lives Matter"]

  const onFinish = values => {
    console.log("Success:", values)
    values['verified'] = false;
    firebase
			.firestore()
			.collection('data')
			.add(values)
			.then(() => {
        console.log("success")
			});
  }

  // function onChange(value) {
  //   console.log(value)
  // }

  return (
    <>
      <Header name="Submit" />
      <Form
        style={{ marginTop: 20, width : "40%", marginLeft : 20}}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Template Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input a title for your template!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: "Please enter the relavent U.S. State or All",
            },
          ]}
        >
          <Select>
            {states.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "Please select the relavent city or All",
            },
          ]}
        >
          <Select>
            {states.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Topic"
          name="topic"
          rules={[
            {
              required: true,
              message: "Please select the relavent topic",
            },
          ]}
        >
          <Select>
            {states.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Author Name"
          name="author-name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
        <Input />
        </Form.Item>
        <Form.Item
          label="Author Email"
          name="author-email"
          rules={[
            {
              required: true,
              type: 'email',
              message: "Please enter your email!",
            },
          ]}
        >
        <Input />
        </Form.Item>
        <Form.Item
          label="Recipient Name"
          name="recipient"
          rules={[
            {
              required: true,
              message: "Please input a recipient for your template!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Recipient Email"
          name="recipientEmail"
          rules={[
            {
              required: true,
              type: 'email',
              message: "Please input a email for the recipient!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please enter the subject for your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Body"
          name="body"
          rules={[
            {
              required: true,
              message: "Please enter the body for your email! ",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SubmitPage
