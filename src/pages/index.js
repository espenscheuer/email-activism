import React, { useState, useEffect } from "react"
import "./index.css"
import { Select, Collapse, Spin, message, Row, Col, Button, Input } from "antd"
import { FacebookShareButton, TwitterShareButton } from "react-share"

import { FacebookIcon, TwitterIcon } from "react-share"

import { CopyOutlined } from "@ant-design/icons"

import SEO from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"
import firebase from "gatsby-plugin-firebase"

function IndexPage() {
  const { Panel } = Collapse

  function handleStateChange(e) {
    setCurrState(e)
    if (!e.includes("All States")) {
      const tempStates = []
      emails.forEach(element => {
        if (element.state === e) {
          tempStates.push(element)
        }
      })
      tempStates.sort()
      setFiltered(tempStates)
    } else {
      setFiltered(emails)
    }
  }
  /*
  function handleCityChange(e) {
    if (!e.includes("All Cities")) {
      const tempCities = []
      emails.forEach(element => {
        if (element.city === e) {
          tempCities.push(element)
        }
      })
      tempCities.sort()
      setFiltered(tempCities)
    } else {
      setFiltered(emails)
    }
  }
  */
  function handleTopicChange(e) {
    if (!e.includes("All Topics")) {
      const tempTopics = []
      emails.forEach(element => {
        if (element.topic === e) {
          tempTopics.push(element)
        }
      })
      tempTopics.sort()
      setFiltered(tempTopics)
    } else {
      setFiltered(emails)
    }
  }

  const [filtered, setFiltered] = useState([])
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState([])
  //const [cities, setCities] = useState([])
  const [topics, setTopics] = useState([])
  const [currState, setCurrState] = useState("All States")

  useEffect(() => {
    // Since firebase runs async, only update state if the app is mounted
    setLoading(true)
    const getEmails = () => {
      firebase
        .firestore()
        .collection("data")
        .where("verified", "==", true)
        .get()
        .then(querySnapshot => {
          const allEmails = []
          querySnapshot.forEach(email => {
            allEmails.push({
              key: email.data().title,
              title: email.data().title,
              author: email.data().authorName,
              recipient: email.data().recipient,
              description: email.data().description,
              recipientEmail: email.data().recipientEmail,
              subject: email.data().subject,
              body: getBody(email),
              state: email.data().state,
              //city: email.data().city,
              topic: email.data().topic,
              ccEmails: email.data().ccEmails,
              shareURL: email.data().shareURL,
            })
          })

          const currStates = ["All States"]
          //const currCities = ["All Cities"]
          const currTopics = ["All Topics"]
          allEmails.forEach(element => {
            currStates.push(element.state)
            //if (!currCities.includes(element.city)) {
            //  currCities.push(element.city)
            //}
            currTopics.push(element.topic)
          })
          setStates([...new Set(currStates)])
          //setCities(currCities)
          setTopics([...new Set(currTopics)])
          const myData = allEmails.sort((a, b) =>
            a.title.localeCompare(b.title)
          )
          setFiltered(myData)
          // setFiltered(allEmails)
          setEmails(allEmails)
        })
    }
    getEmails()

    setLoading(false)
  }, [])

  function getBody(email) {
    let copy = ""
    email
      .data()
      .body.split("\n")
      .map((item, key) => {
        copy += item + "\r\n"
      })
    return copy
  }

  function templateFilterOnEnter(value) {
    let searchVals = []
    const inputVal = value.target.value.toLowerCase()
    emails.forEach(email => {
      if (
        (email.state === currState || currState === "All States") &&
        (email.title.toLowerCase().includes(inputVal) || inputVal === "")
      ) {
        searchVals.push(email)
      }
    })
    setFiltered(searchVals)
  }

  function templateFilterOnChange(value) {
    if (value.target.value === "") {
      handleStateChange(currState)
    }
  }

  return (
    <>
      <Header name="home" />
      <SEO title="Find Causes" />
      {!loading && (
        <>
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 4 }} />
            <Col xs={{ span: 22 }} lg={{ span: 16 }}>
              <div>
                <p style={{ margin: 20, marginBottom: 0 }}>
                  {" "}
                  Take action by contacting government officials. Use our
                  community-sourced collection of email templates to demand
                  change. If you would like to contribute an email template,
                  click the submit tab in the upper right.{" "}
                </p>
                <Select
                  mode="single"
                  style={{
                    width: "30%",
                    minWidth: 100,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  placeholder="States"
                  defaultValue={["All States"]}
                  onChange={handleStateChange}
                >
                  {states.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
                {/*
                <Select
                  mode="single"
                  style={{ width: "20%", minWidth: 100, marginRight: 20 }}
                  placeholder="Cities"
                  defaultValue={["All Cities"]}
                  onChange={handleCityChange}
                >
                  {cities.map(item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
                */}
                <Select
                  mode="single"
                  style={{ width: "30%", minWidth: 100, marginRight: 20 }}
                  placeholder="Topics"
                  defaultValue={["All Topics"]}
                  onChange={handleTopicChange}
                >
                  {topics.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
                <Input
                  placeholder="Search by Title"
                  onPressEnter={value => templateFilterOnEnter(value)}
                  onChange={value => templateFilterOnChange(value)}
                  style={{ width: "20%" }}
                  allowClear={true}
                />
              </div>
              <div>
                <Collapse style={{ margin: 20 }}>
                  {filtered.map((item, index) => (
                    <Panel
                      key={index}
                      header={
                        <div>
                          <b>
                            {item.title} {"-  "}
                          </b>
                          {item.description}
                        </div>
                      }
                    >
                      <div>
                        <p>
                          <b>Recipient:</b> {item.recipient}
                        </p>
                        <p>
                          <b>Topic:</b> {item.topic}
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log(item)
                            navigator.clipboard.writeText(item.recipientEmail)
                            message.success("email copied!")
                          }}
                        >
                          <b>Email:</b> {item.recipientEmail} <CopyOutlined />
                        </p>
                        {item.ccEmails && item.ccEmails.length > 0 && (
                          <p
                            style={{
                              cursor: "pointer",
                              whiteSpace: "pre-line",
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(item.ccEmails)
                              message.success("cc's copied")
                            }}
                          >
                            <b>CC:</b> {item.ccEmails} <CopyOutlined />
                          </p>
                        )}
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigator.clipboard.writeText(item.subject)
                            message.success("subject copied")
                          }}
                        >
                          <b>Subject:</b> {item.subject} <CopyOutlined />
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigator.clipboard.writeText(item.body)
                            message.success("body copied!")
                          }}
                        >
                          <b>Body</b> don't forget to replace the [x] with your
                          info <CopyOutlined />
                        </p>
                        <p
                          style={{ cursor: "pointer", whiteSpace: "pre-line" }}
                          onClick={() => {
                            navigator.clipboard.writeText(item.body)
                            message.success("body copied!")
                          }}
                        >
                          {item.body}
                        </p>
                        {item.author && (
                          <p>This template created by {item.author}</p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <a
                            style={{ marginRight: "1vw" }}
                            href={`mailto:${item.recipientEmail}?cc=${
                              item.ccEmails
                            }&subject=${item.subject}&body=${encodeURIComponent(
                              item.body
                            )}`}
                          >
                            <Button type="primary">Send Email</Button>
                          </a>
                          {item.shareURL && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                style={{ marginRight: "1vw" }}
                                onClick={() => {
                                  navigator.clipboard.writeText(item.shareURL)
                                  message.success("Link copied!")
                                }}
                              >
                                Copy Link
                              </Button>
                              <TwitterShareButton
                                style={{ marginRight: "1vw" }}
                                url={item.shareURL}
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                              <FacebookShareButton
                                url={item.shareURL}
                                quote={item.shareURL}
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </div>
                          )}
                        </div>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </Col>
            <Col xs={{ span: 2 }} lg={{ span: 4 }} />
          </Row>
        </>
      )}
      {loading && (
        <div>
          <Spin size="large" />
        </div>
      )}
      <Footer />
    </>
  )
}

export default IndexPage
