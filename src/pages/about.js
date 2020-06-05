import React from "react"
import "./index.css"

import SEO from "../components/seo"
import Header from "../components/header"

function AboutPage() {
  return (
    <>
      <SEO title="About" />
      <Header name="About" />
      <div style={{ margin: 20 }}>
        <p>
          This site was created by three UW graduates, Espen Scheuer, Cat
          Ratajczak and Suzanne Kaltenbach to make it easier to make change via
          email.
        </p>
        <p>
          If you have any questions, requests, or something seems broken, please
          reach out to Espen at{" "}
          <a href="mailto:espenscheuer@gmail.come">espenscheuer@gmail.com</a>
        </p>
      </div>
    </>
  )
}

export default AboutPage
