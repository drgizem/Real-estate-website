import { Container,Row,Col } from "react-bootstrap"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';



export const Contact=()=>{



  return (
    <Container>
      <Row>
        <Col>
          <div className="mb-5">
            <h3>Contact Us</h3>
            <Row className="mt-5">
              <Col className="contact-main">
              <div className="contact"><LocationOnIcon/></div>
              <p className="mt-3">Wilmington, North Carolina</p>
              </Col>
              <Col className="contact-main">
              <div className="contact"><LocalPhoneIcon/></div>
              <p className="mt-3">+19109101010</p>
              </Col>
              <Col className="contact-main">
              <div className="contact"><EmailIcon/></div>
              <p className="mt-3">drgizemakpinar@gmail.com</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}