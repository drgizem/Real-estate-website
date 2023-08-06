import { useEffect, useState } from "react"
import { Container,Row, Card } from "react-bootstrap"
import { Home } from "../types"
import { useAuthContext } from "../context/AuthContext"
import { SavedjobsLoader } from "../firebase/functions"


export const Saved=()=>{
  const [saved,setSaved]=useState<Home[]>([])
  const user=useAuthContext()

  useEffect(()=>{
    if(user.uid !==""){
      SavedjobsLoader(user.uid).then((data)=>{
        setSaved(data)
      })
    }// eslint-disable-next-line
  },[])
  return (
    <Container className="saved-homes">
      <Row className="rental-homes">
            {saved.map((data,index)=>{
              return <Card key={index} className="rental">
                <div>
                  <Card.Img src={data.image} alt="" />
                  <h3 className="mb-2">{data.name}</h3>
                  <Card.Text><strong>${data.price}</strong>/month </Card.Text>
                  <Card.Text>
                  {data.room} bds / {data.bathroom} ba
                  </Card.Text>
                  <Card.Text className="mt-2">{data.address}</Card.Text></div>
              </Card>
            })}
      </Row>
    </Container>
  )
}