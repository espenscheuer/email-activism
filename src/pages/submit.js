import React, { useEffect, useState } from 'react';
import { ReCaptcha } from 'react-recaptcha-google'
// import { Link } from "gatsby"
import { Form, Input, Button, Select, Modal, Result } from "antd";
import firebase from 'firebase';
import "./index.css"

import SEO from "../components/seo"
import Header from "../components/header"
import { navigate } from "@reach/router";
import { NoFragmentCycles } from 'graphql/validation/rules/NoFragmentCycles';

function SubmitPage() {
  const states = ["All States", "CA", "WA", "NY"]
  const cities = ["All Cities", "Seattle", "Washington", "New York"]
  const topics = ["All", "Black Lives Matter"]
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const onFinish = values => {
    console.log("Success:", values)
    const data = {
      title: values.title,
      state: values.state,
      city: values.city,
      topic: values.topic,
      creatorEmail: values.creatorEmail,
      recipient: values.recipient,
      recipientEmail: values.recipientEmail,
      subject: values.subject,
      body: values.body,
      verified: false
    }
    if (values['creatorName'] !== undefined) {
      data['creatorName'] = values.creatorName
    }
    firebase
      .firestore()
      .collection("data")
      .add(data)
      .then(() => {
        setSubmitSuccess(true)
        console.log("success")
      })
      .catch((e) => {
        setSubmitError(true)
      });
  }
  
  function handleCancel() {
    setSubmitSuccess(false)
    setSubmitError(false)
  };

  function handleOK() {
    setSubmitSuccess(false)
    setSubmitError(false)
    navigate('/')
  }

  function error() {
    Modal.error({
      content: 'Sorry, an error occurred. Your template could not be submitted.',
    });
  }

  return (
    <>
      <SEO title="Submit" />
      <Header name="Submit" />
      {submitSuccess && !submitError &&
        <Result
          status="success"
          title='Thank you! Your template has been submitted for review!'
          subTitle='You will be notified via the provided email when it has been verified and uploaded'
          extra={[
            <Button key="back" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
            <Button key="submit" onClick={() => handleCancel()}>
              Submit Another Template
            </Button>,
          ]}
        />
      }
      {submitError &&
        <Result
          status="500"
          title='Sorry, something went wrong.'
          subTitle='Your template could not be submitted.'
          extra={[
            <Button key="back" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
            <Button key="submit" onClick={() => handleCancel()}>
               Try Again
            </Button>,
          ]}
        />
      }
      { !submitSuccess && !submitError &&
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
          label="Creator Name"
          name="creatorName"
          rules={[
            {
              message: "Please enter your name!",
            },
          ]}
        >
        <Input />
        </Form.Item>
        <Form.Item
          label="Creator Email"
          name="creatorEmail"
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
    }
    </>
  )
}

export default SubmitPage
