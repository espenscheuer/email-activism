import React, { useEffect, useState } from "react"
import { ReCaptcha } from "react-recaptcha-google"
// import { Link } from "gatsby"
import { Form, Row, Col, Input, Button, Select, Modal, Result } from "antd"
import firebase from "gatsby-plugin-firebase"
import "./index.css"

import SEO from "../components/seo"
import Header from "../components/header"
import { navigate } from "@reach/router"
import { NoFragmentCycles } from "graphql/validation/rules/NoFragmentCycles"

import { CountryRegionData } from "react-country-region-selector"

function SubmitPage() {
  console.log(CountryRegionData[234])
  const { TextArea } = Input
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }
  const tailLayout = {
    wrapperCol: { offset: 3, span: 16 },
  }

  const states = [
    "All States",
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]
  const cities = ["All Cities", "Seattle", "Washington", "New York"]
  const topics = [
    "All Topics",
    "Defund/Demiltarize Police",
    "Elected Officials Requests",
    "Recognition of Past Violence",
  ]
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const onFinish = values => {
    console.log("Success:", values)
    let copy = values
    if(!values.creatorName) {
        copy.creatorName = ''
    }
    if(!values.state) {
        copy.state ='All States'
    }
    if(!values.topic) {
        copy.topic ='All Topics'
    }
    const data = {
      title: copy.title,
      state: copy.state,
      // city: copy.city,
      topic: copy.topic,
      creatorEmail: copy.creatorEmail,
      recipient: copy.recipient,
      recipientEmail: copy.recipientEmail,
      subject: copy.subject,
      body: copy.body,
      verified: false,
    }
    firebase
      .firestore()
      .collection("data")
      .add(data)
      .then(() => {
        setSubmitSuccess(true)
        console.log("success")
      })
      .catch(e => {
        setSubmitError(true)
      })
  }

  function handleCancel() {
    setSubmitSuccess(false)
    setSubmitError(false)
  }

  function handleOK() {
    setSubmitSuccess(false)
    setSubmitError(false)
    navigate("/")
  }

  function error() {
    Modal.error({
      content:
        "Sorry, an error occurred. Your template could not be submitted.",
    })
  }

  return (
    <>
      <SEO title="Submit" />
      <Header name="Submit" />
      <Row>
        <Col xs={{ span: 0 }} lg={{ span: 4 }} />
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          {submitSuccess && !submitError && (
            <Result
              status="success"
              title="Thank you! Your template has been submitted for review!"
              subTitle="You will be notified via the provided email when it has been verified and uploaded"
              extra={[
                <Button key="back" onClick={() => navigate("/")}>
                  Back to Home
                </Button>,
                <Button key="submit" onClick={() => handleCancel()}>
                  Submit Another Template
                </Button>,
              ]}
            />
          )}
          {submitError && (
            <Result
              status="500"
              title="Sorry, something went wrong."
              subTitle="Your template could not be submitted."
              extra={[
                <Button key="back" onClick={() => navigate("/")}>
                  Back to Home
                </Button>,
                <Button key="submit" onClick={() => handleCancel()}>
                  Try Again
                </Button>,
              ]}
            />
          )}
          {!submitSuccess && !submitError && (
            <Form
              {...layout}
              style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}
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
                    message: "Please enter the relavent U.S. State or All",
                  },
                ]}
              >
                <Select defaultValue="All States">
                  {states.map(item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {/*
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
            */}
              <Form.Item
                label="Topic"
                name="topic"
                rules={[
                  {
                    message: "Please select the relavent topic",
                  },
                ]}
              >
                <Select defaultValue="All Topics">
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
                    message: "Please enter the authors name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Your Email"
                name="creatorEmail"
                rules={[
                  {
                    required: true,
                    type: "email",
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
                    type: "email",
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
                <TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
        <Col xs={{ span: 0 }} lg={{ span: 4 }} />
      </Row>
    </>
  )
}

export default SubmitPage
