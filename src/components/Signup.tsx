import { Col, Container, Row ,Form,Button} from "react-bootstrap"
import { useState } from "react"
import signup from "../firebase/auth/signup"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import LockIcon from '@mui/icons-material/Lock';

export const Signup=()=>{
const [user,setUser]=useState({
  name:"",
  email:"",
  password:""
})
const [error,setError]=useState(false)
const[validate,setValidate]=useState(false)
const navigate=useNavigate()
const handleChange=(e:any)=>{
  const {value,name}=e.target
  setUser((pre)=>{
    return {...pre,[name]:value}
  })
}
const handleSubmit=async(e:any)=>{
  e.preventDefault()
  setValidate(true)
  const {error}=await signup(user.email,user.password,user.name)
  if(error){
    return setError(true)
  }
  setDoc(doc(db,"users",`${auth.currentUser!.uid}`),{
    name:auth.currentUser!.displayName,
    email:auth.currentUser!.email,
    uid:auth.currentUser!.uid,
    saved:[]
  })
  return navigate("/")
}

  return (
    <Container>
      <Row>
        <Col>
        <div className="login-card">
        <div className="login-lockicon"><LockIcon fontSize="large"/></div>
        <Form validated={validate} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control required onChange={handleChange} value={user.name} name="name" type="text" placeholder="Enter user name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control required onChange={handleChange} value={user.email} name="email" type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} onChange={handleChange} value={user.password} name="password" type="password" placeholder="Password" />
        {error && <div style={{color:"red"}}>Password should be at least 6 characters</div>}
      </Form.Group>
      <Button type="submit">
        Sign up 
      </Button>
    </Form>
        </div>
        </Col>
      </Row>
    </Container>
  )
}