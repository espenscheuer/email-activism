import React, { useState, useEffect } from "react"
import "./index.css"
import { Select, Collapse, Spin, message } from "antd"

import { CopyOutlined } from "@ant-design/icons"

import SEO from "../components/seo"
import Header from "../components/header"
import firebase from "gatsby-plugin-firebase"

function IndexPage() {
  const { Panel } = Collapse

  function handleStateChange(e) {
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
  function handleTopicChange(e) {
    if (!e.includes("All Topics")) {
      const tempTopics = []
      emails.forEach(element => {
        if (element.city === e) {
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
  const [cities, setCities] = useState([])
  const [topics, setTopics] = useState([])

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
              recipient: email.data().recipient,
              recipientEmail: email.data().recipientEmail,
              subject: email.data().subject,
              body: email.data().body,
              state: email.data().state,
              city: email.data().city,
              topic: email.data().topic,
            })
          })
          const currStates = ["All States"]
          const currCities = ["All Cities"]
          const currTopics = ["All Topics"]
          allEmails.forEach(element => {
            if (!currStates.includes(element.state)) {
              currStates.push(element.state)
            }
            if (!currCities.includes(element.city)) {
              currCities.push(element.city)
            }
            if (!currTopics.includes(element.topics)) {
              currTopics.push(element.topic)
            }
          })
          setStates(currStates)
          setCities(currCities)
          setTopics(currTopics)
          setFiltered(allEmails)
          setEmails(allEmails)
        })
    }
    getEmails()
    setLoading(false)
  }, [])

  return (
    <>
      <SEO title="Find Causes" />
      <Header />

      {!loading && (
        <>
          <div>
            <p style={{ margin: 20, marginBottom: 0 }}>
              {" "}
              Here you can find a list of email templates submitted by the
              community. You can filter them by state, city, or topic. If the
              send email link doesn't work just copy the recipient and body by
              clicking on it.{" "}
            </p>
            <Select
              mode="single"
              style={{
                width: "20%",
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
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
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
            <Select
              mode="single"
              style={{ width: "20%", minWidth: 100, marginRight: 20 }}
              placeholder="Topics"
              defaultValue={["All Topics"]}
              onChange={handleTopicChange}
            >
              {topics.map(item => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Collapse style={{ marginTop: 20, marginLeft: 20, width: "80vw" }}>
              {filtered.map((item, index) => (
                <Panel header={item.title} key={index}>
                  <div>
                    <p>Recipient: {item.recipient}</p>
                    <p>State: {item.state}</p>
                    <p>City: {item.city}</p>
                    <p>Topic: {item.topic}</p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(item.body)
                        message.success('email copied!');
                      }}
                    >
                      Email: {item.recipientEmail} <CopyOutlined />
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(item.body)
                        message.success('subject copied');
                      }}
                    >
                      Subject: {item.subject} <CopyOutlined />
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(item.body)
                        message.success('body copied!');
                      }}
                    >
                      Body don't forget to replace the [x] with your info <CopyOutlined />
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(item.body)
                        message.success('body copied!');
                      }}
                    >
                      {item.body}
                    </p>
                    <a
                      href={`mailto:${item.recipientEmail}?subject=${item.recipientEmail}&body=${item.body}`}
                    >
                      Send Email!
                    </a>
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </>
      )}
      {loading && (
        <div>
          <Spin size="large" />
        </div>
      )}
    </>
  )
}

export default IndexPage
