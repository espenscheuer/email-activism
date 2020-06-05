import React, { useEffect, useState } from 'react';
// import { Link } from "gatsby"
import { Form, Input, Button, Select, Modal } from "antd";
import firebase from 'firebase';
import "./index.css"

import SEO from "../components/seo"
import Header from "../components/header"
import { navigate } from "@reach/router";

function SubmitPage() {
  const states = ["All States", "CA", "WA", "NY"]
  const cities = ["All Cities", "Seattle", "Washington", "New York"]
  const topics = ["All", "Black Lives Matter"]
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onFinish = values => {
    console.log("Success:", values)
    values['verified'] = false;
    firebase
      .firestore()
      .collection("data")
      .add(values)
      .then(() => {
        setSubmitSuccess(true)
        console.log("success")
      })
      .catch((e) => {
        error()
      });
  }

  // function onChange(value) {
  //   console.log(value)
  // }

  // function success() {
  //   Modal.success({
  //     title: 'Thank you! Your template has been submitted for review!',
  //     content: 'You will be notified via the provided email when it has been verified and uploaded.',
  //     onOK() {navigate('/')},
  //   });
  // }
  
  function handleCancel() {
    setSubmitSuccess(false)
  };

  function error() {
    Modal.error({
      content: 'Sorry, an error occurred. Your template could not be submitted.',
    });
  }

  return (
    <>
      <SEO title="Submit" />
      <Header name="Submit" />
      <Modal
          visible={submitSuccess}
          title='Thank you! Your template has been submitted for review!'
          onOK={ () => navigate('/')}
          onCancel={() => handleCancel()}
          okText="Back To Home"
          cancelText="Submit Another Template"
          // footer={[
          //   <Button key="back" onClick={() => navigate('/')}>
          //     Back to Home
          //   </Button>,
          //   <Button key="submi" onClick={() => handleCancel()}>
          //     Submit Another Template
          //   </Button>,
          // ]}
          closeable="false"
          destroyOnClose
        >
        <p>You will be notified via the provided email when it has been verified and uploaded.</p>
        </Modal>
      <Form
        style={{ marginTop: 20, width: "40%", marginLeft: 20 }}
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
            {cities.map(item => (
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
            {topics.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Author Name"
          name="authorName"
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
          name="authorEmail"
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
