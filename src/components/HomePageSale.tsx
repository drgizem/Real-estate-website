import { doc, getDoc } from "firebase/firestore"
import { Home } from "../types"
import { db } from "../firebase/firebase"
import { useLoaderData } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';


export const HomePageSale=()=>{
  const salehome=useLoaderData() as {home:Home}

  return (
    <Container>
      <Row>
        <Col>
        <div className="single">
          <h1>{salehome.home.name}</h1>
          <p>{salehome.home.city}/ {salehome.home.state}</p>
          <p>{salehome.home.address}</p>
          <img src={salehome.home.image} alt=""/>
          <div className="details">
            <h3 className="mt-3">{salehome.home.type} details</h3>
            <p><strong>${salehome.home.price}</strong></p>
            {Number(salehome.home.room)>1 ? <p>{salehome.home.room} bedrooms</p> : <p>{salehome.home.room} bedroom</p>}
            {Number(salehome.home.bathroom)>1 ? <p>{salehome.home.bathroom} bathrooms</p> : <p>{salehome.home.bathroom} bathroom</p>}
          </div>
          <hr/>
          <div className="description">
            <h3>Building overview</h3>
            <p>{salehome.home.description}</p>
          </div>
          <hr/>
          <div className="features">
            <h3>Features</h3>
            <h4>Key features</h4>
            {salehome.home.pet && <div className="pet"><div><PetsIcon/></div><p>Pet-friendly</p></div>}
            {salehome.home.parking && <div className="pet"><div><LocalParkingIcon/></div><p>Covered parking, parking lot</p></div>}
            <h4>Unit features</h4>
            <p>{salehome.home.features}</p>
          </div>
          <hr/>
          <div className="lease">
            <h3>Mortgage details</h3>
            <p>Price: <strong>${salehome.home.lease}</strong>/month</p>
          </div>
          <hr/>
          <div className="scores">
            <h3>Travel scores</h3>
            <Row className="score-row">
              <Col xs={1}>
                <div className="walk"><DirectionsWalkIcon/></div>
              </Col>
              <Col>
              <h5>Walk Score</h5>
              <p>{salehome.home.walk}/100</p>
              </Col>
            </Row>
            <Row>
            <Col xs={1}>
              <div className="walk"><DirectionsBusIcon/></div>
            </Col>
            <Col>
              <h5>Transit Score</h5>
              <p>{salehome.home.transit}/100</p>
              </Col>
            </Row>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export const HomeSaleLoader=async({params}:any)=>{
  const {id}=params
  let home:Home={} as Home
  const docRef=doc(db,"buy",`${id}`)
  const docSnap=await getDoc(docRef)
  if(docSnap.exists()){
    home=docSnap.data() as Home
  }
  return {home}
}