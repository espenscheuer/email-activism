import React from "react"
import "./index.css"
import { Select, Option, Collapse } from "antd"

import Header from "../components/header"

function IndexPage() {
  const { Panel } = Collapse

  function handleStateChange(e) {
    console.log(e)
  }
  function handleCityChange(e) {
    console.log(e)
  }
  function handleTopicChange(e) {
    console.log(e)
  }
  function callback(key) {
    console.log(key)
  }

  const states = ["All States", "CA", "WA", "NY"]
  const cities = ["All Cities", "Seattle", "Washington", "New York"]
  const topics = ["All", "Black Lives Matter"]
  const templates = [
    {
      title: "Fuck Inslee",
      recipient: "Jay Inslee",
      recipientEmail: "espenscheuer@gmail.com",
      subject: "Hey, Fuck you",
      body: "Hey now listen... Fuck you",
      state: "WA",
      city: "ALL",
      topic: "Black Lives Matter",
    },
  ]

  return (
    <>
      <Header name="Find Causes" />
      <div>
        <Select
          mode="multiple"
          style={{ width: "20%", marginTop: 20, marginRight: 20 }}
          placeholder="States"
          defaultValue={["All States"]}
          onChange={handleStateChange}
        >
          {states.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
        </Select>
        <Select
          mode="multiple"
          style={{ width: "20%", marginRight: 20 }}
          placeholder="Cities"
          defaultValue={["All Cities"]}
          onChange={handleCityChange}
        >
          {cities.map(item => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
        </Select>
        <Select
          mode="multiple"
          style={{ width: "20%", marginRight: 20 }}
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
        <Collapse onChange={callback} style={{ marginTop: 20 }}>
          {templates.map((item, index) => (
            <Panel header={item.title} key={index}>
                <div>
                  <p>Recipient: {item.recipient}</p>
                  <p>Email: {item.recipientEmail}</p>
                  <p>Subject: {item.subject}</p>
                  <p>Body: {item.body}</p>
                  <a href={`mailto:${item.recipientEmail}?subject=${item.recipientEmail}&body=${item.body}`}>Send Email!</a>
                </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}

export default IndexPage
