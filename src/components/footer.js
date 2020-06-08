import React from "react"
import { Layout, Row, Col } from "antd"
import "antd/dist/antd.css"
import "../pages/index.css"

function PageFooter() {
  const { Footer } = Layout

  return (
    <Row>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />

      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
        <div style={{ margin: 20 }}>
          If you have any issues or questions please contact us at{" "}
          <a href="mailto:questionsefc@gmail.com">questionsefc@gmail.com</a> or
          file an issue on our github{" "}
          <a href="https://github.com/espenscheuer/email-activism">here</a>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 4 }} />
    </Row>
  )
}

export default PageFooter
