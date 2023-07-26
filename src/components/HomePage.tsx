import { doc, getDoc } from "firebase/firestore"
import { Home } from "../types"
import { db } from "../firebase/firebase"
import { useLoaderData } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';


export const HomePage=()=>{
  const homeData=useLoaderData() as {home:Home}

  return (
    <Container>
      <Row>
        <Col>
        <div className="single">
          <h1>{homeData.home.name}</h1>
          <p>{homeData.home.city}/ {homeData.home.state}</p>
          <p>{homeData.home.address}</p>
          <img src={homeData.home.image} alt=""/>
          <div className="details">
            <h3 className="mt-3">{homeData.home.type} details</h3>
            <p><strong>${homeData.home.price}</strong>/month</p>
            {Number(homeData.home.room)>1 ? <p>{homeData.home.room} bedrooms</p> : <p>{homeData.home.room} bedroom</p>}
            {Number(homeData.home.bathroom)>1 ? <p>{homeData.home.bathroom} bathrooms</p> : <p>{homeData.home.bathroom} bathroom</p>}
          </div>
          <div className="description">
            <h3>Building overview</h3>
            <p>{homeData.home.description}</p>
          </div>
          <div className="features">
            <h3>Features</h3>
            <h4>Key features</h4>
            {homeData.home.pet && <div className="pet"><PetsIcon/><p>Pet-friendly</p></div>}
            {homeData.home.parking && <div className="pet"><LocalParkingIcon/><p>Covered parking, parking lot</p></div>}
            <h4>Unit features</h4>
            <p>{homeData.home.features}</p>
          </div>
          <div className="lease">
            <h3>Lease Terms</h3>
            <p>At least {homeData.home.lease} months</p>
            <p>Price: ${homeData.home.price}/month</p>
          </div>
          <div className="scores">
            <h3>Travel scores</h3>
            <Row className="score-row">
              <Col xs={1}>
                <div className="walk"><DirectionsWalkIcon/></div>
              </Col>
              <Col>
              <h5>Walk Score</h5>
              <p>{homeData.home.walk}/100</p>
              </Col>
            </Row>
            <Row>
            <Col xs={1}>
              <div className="walk"><DirectionsBusIcon/></div>
            </Col>
            <Col>
              <h5>Transit Score</h5>
              <p>{homeData.home.transit}/100</p>
              </Col>
            </Row>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export const HomeLoader=async({params}:any)=>{
  const {id}=params
  let home:Home={} as Home
  const docRef=doc(db,"rentals",`${id}`)
  const docSnap=await getDoc(docRef)
  if(docSnap.exists()){
    home=docSnap.data() as Home
  }
  return {home}
}