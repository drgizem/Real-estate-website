import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Home } from "../types"
import uuid from 'react-uuid';
import { doc, setDoc } from "firebase/firestore"
import { db,storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


export const Admin=()=>{
  const [home,setHome]=useState<Home>({
    city:"",
    state:"",
    address:"",
    type:"",
    room:"",
    bathroom:"",
    price:"",
    image:"",
    name:"",
    id:uuid(),
    description:"",
    parking:false,
    pet:false,
    features:"",
    walk:"",
    transit:"",
    lease:""
  })
const handleChange=(e:any)=>{
  const {name,value}=e.target
  setHome((pre)=>{
    return {...pre,[name]:value}
  })
}
const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files){
    const image=e.target.files[0]
    const storageRef=ref(storage,`images/${home.id}`)
    const uploadTask=uploadBytesResumable(storageRef,image)
    uploadTask.on("state_changed",
    (snapshot)=>{
      console.log(snapshot)
    }
    ,(error)=>{
      console.log(error)
    }
    ,()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        console.log("File available at",downloadURL);
        setHome({...home,image:downloadURL})
      })
    })
  }
}
const handleSubmit=(e:any)=>{
  e.preventDefault()
  setDoc(doc(db,"buy",`${home.id}`),{
    city:home.city,
    state:home.state,
    address:home.address,
    type:home.type,
    room:home.room,
    bathroom:home.bathroom,
    price:home.price,
    image:home.image,
    name:home.name,
    description:home.description,
    parking:home.parking,
    pet:home.pet,
    features:home.features,
    walk:home.walk,
    transit:home.transit,
    lease:home.lease
  })
  setHome({} as Home)
}
  return (
    <Container className="admin-page">
     <Row>
      <Col>
      <div>
        <h1>Add Home Information</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="text" placeholder="city" name="city" value={home.city || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="state" name="state" value={home.state || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="address" name="address" value={home.address || ""} onChange={handleChange} />
          <Form.Control type="text" placeholder="type" name="type" value={home.type || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="room" name="room" value={home.room || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="bathroom" name="bathroom" value={home.bathroom || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="price" name="price" value={home.price || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="name" name="name" value={home.name || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="description" name="description" value={home.description || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="features" name="features" value={home.features || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="walk" name="walk" value={home.walk || ""}onChange={handleChange}  />
          <Form.Control type="text" placeholder="transit" name="transit" value={home.transit || ""} onChange={handleChange}  />
          <Form.Control type="text" placeholder="lease" name="lease" value={home.lease || ""} onChange={handleChange}  />
          <Form.Check  name="pet" label="Pet allowed"  onChange={()=>setHome({...home,pet:!home.pet})}  />
          <Form.Check  name="parking" label="Parking Area"  onChange={()=>setHome({...home,parking:!home.parking})} />
          <Form.Control type="file" name="image" onChange={handleImage} />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
      </Col>
     </Row>
    </Container>

  )
}