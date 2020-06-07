import { navigate } from "gatsby"
import React from "react"
import { PageHeader, Button, Row, Col, Typography  } from "antd"
import "antd/dist/antd.css"

function Header() {
  const { Title } = Typography;
  const title = (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/")
      }}
    >
      <Title level={3}>Emails for Change</Title>
    </div>
  )
  return (
    <Row>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />

      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
        <PageHeader
          style={{ paddingBottom: 10 }}
          className="site-page-header"
          title={title}
          extra={[
            <Button
              onClick={() => {
                navigate("/about")
              }}
            >
              About
            </Button>,
            <Button
              onClick={() => {
                navigate("/submit")
              }}
            >
              Submit Template
            </Button>,
            <Button
              onClick={() => {
                navigate("/")
              }}
            >
              Home
            </Button>,
          ]}
          
        />
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />
    </Row>
  )
}

export default Header
