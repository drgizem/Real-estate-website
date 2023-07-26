import { Col, Container, Row } from "react-bootstrap"
import house from "../housebanner.jpeg"

export const Banner=()=>{


  return (
    <Container className="banner">
      <Row>
        <Col>
        <div className="content">
          <img src={house} alt="" />
          <p>Find your dream house</p>
        </div>
        </Col>
      </Row>
    </Container>
  )
}