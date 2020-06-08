import { navigate } from "gatsby"
import React from "react"
import { PageHeader, Button, Row, Col, Typography } from "antd"
import "antd/dist/antd.css"

function Header() {
  const { Title } = Typography
  const url = window.location.href
  const title = (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/")
      }}
    >
      <Title level={2}>Emails for Change</Title>
    </div>
  )
  return (
    <Row>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />

      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
        <PageHeader
          className="site-page-header"
          title={title}
          extra={[
            <Button
              style={
                !url.includes("about") && !url.includes("submit")
                  ? { color: "#F4B942", paddingTop: 10 }
                  : { color: "black", paddingTop: 10 }
              }
              type="link"
              onClick={() => {
                navigate("/")
              }}
            >
              <b>Find a Cause</b>
            </Button>,
            <Button
              style={
                url.includes("about")
                  ? { color: "#F4B942", paddingTop: 10 }
                  : { color: "black", paddingTop: 10 }
              }
              type="link"
              onClick={() => {
                navigate("/about")
              }}
            >
              <b>About</b>
            </Button>,
            <Button
              style={
                url.includes("submit")
                  ? { color: "#F4B942", paddingTop: 10 }
                  : { color: "black", paddingTop: 10 }
              }
              type="link"
              onClick={() => {
                navigate("/submit")
              }}
            >
              <b>Submit Template</b>
            </Button>,
          ]}
        />
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />
    </Row>
  )
}

export default Header
