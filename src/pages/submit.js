import React, { useState } from "react"
import { Form, Row, Col, Input, message, Button, Select, Result } from "antd"
import firebase from "gatsby-plugin-firebase"
import "./index.css"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { FacebookShareButton, TwitterShareButton } from "react-share"

import { FacebookIcon, TwitterIcon } from "react-share"

import SEO from "../components/seo"
import Header from "../components/header"
import { navigate } from "@reach/router"

function SubmitPage() {
  const { TextArea } = Input
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  }
  function label(text) {
    return (
      <p>
        <b>{text}</b>
      </p>
    )
  }

  const emailPlaceholders = [
    "alex@gmail.com",
    "alice@comcast.net",
    "bob@aol.com",
  ]

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
  const [loading, setLoading] = useState(false)
  const [shareURL, setShareURL] = useState("")

  const onFinish = values => {
    setLoading(true)
    let copy = values
    if (!values.creatorName) {
      copy.creatorName = ""
    }
    if (!values.state) {
      copy.state = "All States"
    }
    if (!values.topic) {
      copy.topic = "All Topics"
    }
    if (!values.ccEmails) {
      copy.ccEmails = ""
    }
    let cc = ""
    if (values.CC) {
      cc = values.CC.toString()
      const regEx = new RegExp("[,]", "g")
      cc = cc.replace(regEx, ", ")
      console.log(cc)
    }

    copy.body.split("\n").map(function (item, key) {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      )
    })

    copy.shareURL = "didn't get overwritten"
    const data = {
      title: copy.title,
      state: copy.state,
      // city: copy.city,
      topic: copy.topic,
      description: copy.description,
      creatorEmail: copy.creatorEmail,
      recipient: copy.recipient,
      recipientEmail: copy.recipientEmail,
      ccEmails: cc,
      subject: copy.subject,
      body: copy.body,
      verified: false,
      shareURL: copy.shareURL,
    }
    getTinyURL(copy)
      .then(res => {
        data["shareURL"] = res
        firebase
          .firestore()
          .collection("data")
          .add(data)
          .then(() => {
            setShareURL(res)
            setSubmitSuccess(true)
            console.log("success")
          })
          .catch(e => {
            setSubmitError(true)
          })
        setLoading(false)
      })
      .catch(e => {
        setSubmitError(true)
      })
  }

  function handleCancel() {
    setSubmitSuccess(false)
    setSubmitError(false)
  }

  function getTinyURL(item) {
    var TinyURL = require("tinyurl")
    const result = TinyURL.shorten(
      `mailto:${item.recipientEmail}?cc=${item.ccEmails}&subject=${
        item.subject
      }&body=${encodeURIComponent(item.body)}`
    )
    return result
  }

  return (
    <>
      <Header name="submit" />
      <SEO title="Submit" />
      <Row>
        <Col xs={{ span: 0 }} lg={{ span: 4 }} />
        <Col xs={{ span: 22 }} lg={{ span: 16 }}>
          {submitSuccess && !submitError && (
            <Result
              status="success"
              title="Thank you! Your template has been submitted for review."
              subTitle="You can share the new mailto link that has been created for your template while your submission is under review for upload to our site. We'll notify you via the provided email address upon approval."
              extra={[
                <Button key="back" onClick={() => navigate("/")}>
                  Back to Home
                </Button>,
                <Button key="submit" onClick={() => handleCancel()}>
                  Submit Another Template
                </Button>,
                <div style={{ textAlign: "center", paddingTop: 10 }}>
                  <Button
                    style={{ bottom: 10, marginRight: 5 }}
                    onClick={() => {
                      navigator.clipboard.writeText(shareURL)
                      message.success("Link copied!")
                    }}
                  >
                    Copy Link
                  </Button>
                  <TwitterShareButton url={shareURL} style={{ marginRight: 5 }}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <FacebookShareButton url={shareURL} quote={shareURL}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>,
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
            <>
              <p style={{ margin: 20, marginBottom: 0 }}>
                {" "}
                Here you can submit a template you have created or found to be
                featured on the main page. Please credit the original creator of
                the template in the creator name field if they wish to be
                credited.{" "}
              </p>
              <Form
                {...layout}
                style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                {label("Template Title")}
                <Form.Item
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
                {label("One Line Description")}
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input a short description for your template!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                  <div style = {{width: "49%"}}>
                    {label("State")}
                    <Form.Item
                      name="state"
                      rules={[
                        {
                          message:
                            "Please enter the relavent U.S. State or All",
                        },
                      ]}
                    >
                      <Select defaultValue="All States">
                        {states.map(item => (
                          <Select.Option value={item}>{item}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div style = {{width: "4%"}}/>
                  <div style = {{width: "48%"}}>
                    {label("Topic")}
                    <Form.Item
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
                  </div>
                </div>
                {label("Creator Name")}
                <Form.Item
                  name="creatorName"
                  rules={[
                    {
                      message: "Please enter the authors name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {label("Your Email")}
                <Form.Item
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
                {label("Recipient Name")}
                <Form.Item
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
                {label("Recipient Email")}
                <Form.Item
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
                {label("CC")}
                <Form.List name="CC">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...layout}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  type: "email",
                                  message:
                                    "Please input CC's or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder={
                                  emailPlaceholders[
                                    index % emailPlaceholders.length
                                  ]
                                }
                                style={{ width: "90%" }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              style={{ margin: "0 8px" }}
                              onClick={() => {
                                remove(field.name)
                              }}
                            />
                          </Form.Item>
                        ))}
                        <Form.Item {...layout}>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add()
                            }}
                            style={{ width: "100%" }}
                          >
                            <PlusOutlined /> Add a CC
                          </Button>
                        </Form.Item>
                      </div>
                    )
                  }}
                </Form.List>
                {label("Email Subject")}
                <Form.Item
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
                {label("Email Body")}
                <Form.Item
                  name="body"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the body for your email! ",
                    },
                  ]}
                >
                  <TextArea style={{ whitespace: "pre-line" }} rows={4} />
                </Form.Item>
                <Form.Item {...layout}>
                  <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    style={{ width: 150 }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Col>
        <Col xs={{ span: 2 }} lg={{ span: 4 }} />
      </Row>
    </>
  )
}

export default SubmitPage

/*
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
            */
