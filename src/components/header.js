import { Link, navigate } from "gatsby"
import React from "react"
import { PageHeader, Button } from "antd"
import "antd/dist/antd.css"

function Header({ name }) {
  const title = (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/")
      }}
    >
      <h3> Email Activism </h3>
    </div>
  )
  return (
    <PageHeader
      style ={{paddingBottom:10}}
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
          Submit
        </Button>,  
      ]}
    />
  )
}

export default Header