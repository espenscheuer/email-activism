import { navigate } from "gatsby"
import React from "react"
import { PageHeader, Button, Row, Col, Typography, Layout } from "antd"
import "antd/dist/antd.css"
import "../pages/index.css"

function Header({ name }) {
  const { Title } = Typography
  const nav = [
    <Button
      style={
        name === "home"
          ? { color: "#F4B942", paddingTop: 10, marginLeft: 6 }
          : { color: "black", paddingTop: 10, marginLeft: 6 }
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
        name === "about"
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
        name === "submit"
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
  ]
  const title = (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/")
      }}
    >
      <Title level={2} style={{ marginBottom: 0 }}>
        Emails for Change
      </Title>
    </div>
  )
  return (
    <Row>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />

      <Col xs={{ span: 0 }} lg={{ span: 16 }}>
        <PageHeader className="site-page-header" title={title} extra={nav} />
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 0 }}>
        <PageHeader className="site-page-header" title={title} />
        <div>{nav}</div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />
    </Row>
  )
}

export default Header
