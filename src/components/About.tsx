import { Col, Container, Row } from "react-bootstrap"
import house from "../aboutimg.jpg"


export const About=()=>{


  return (
    <Container className="mt-5">
      <Row>
        <Col>
        <div id="about">
          <Row>
          <Col xs={12} md={7} className="mb-5">
          <h3 className="mb-4">About Us</h3>
          <p>Zillow Group is reimagining real estate to make it easier to unlock life’s next chapter.<br/>
            As the most-visited real estate website in the United States, Zillow and its affiliates offer customers an on-demand experience for selling, buying, renting and financing with transparency and nearly seamless end-to-end service. Zillow Home Loans, our affiliate lender, provides our customers with an easy option to get pre-approved and secure financing for their next home purchase.</p>
          </Col>
          <Col xs={12} md={5}>
          <img src={house}  alt=""/>
          </Col>
          </Row>
        </div>
        </Col>
      </Row>
    </Container>
  )
}