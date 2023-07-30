import { Col, Container, Row } from "react-bootstrap"
import house from "../housebanner.jpeg"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Banner=()=>{


  return (
    <Container className="banner">
      <Row>
        <Col>
        <div className="content">
          <img src={house} alt="" />
          <p>Explore Real Esty <KeyboardArrowDownIcon/></p>
        </div>
        </Col>
      </Row>
    </Container>
  )
}