import React from "react"
import "./index.css"

import SEO from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

import { Row, Col } from "antd"

function AboutPage() {
  return (
    <>
    <Header name="About" />
      <Row>
        <SEO title="About" />
        <Col xs={{ span: 0 }} lg={{ span: 4 }} />
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <div style={{ margin: 20, marginBottom : 0 }}>
            <p>
              This site was created by three UW graduates, Espen Scheuer, Cat
              Ratajczak and Suzanne Kaltenbach to make it easier to make change
              via email.
            </p>
            <p>
              If the email links aren't working it is probably because you do
              not have a default email app on your computer. This is really hard
              to fix (I can't even use them on my computer), so the easiest
              solution is probably copy and paste.
            </p>
            <p>
              If you have any questions, requests, or something seems broken,
              please reach out using the email or github below. 
            </p>
          </div>
        </Col>
        <Col xs={{ span: 0 }} lg={{ span: 4 }} />
      </Row>
      <Footer/>
    </>
  )
}

export default AboutPage
