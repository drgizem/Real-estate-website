import { useState } from "react"
import { Col, Container, Row ,Form,Button} from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import signin from "../firebase/auth/signin"
import LockIcon from '@mui/icons-material/Lock';


export const Login=()=>{
  const[user,setUser]=useState({
    email:"",
    password:""
  })
  const [validate,setValidate]=useState(false)
  const [error,setError]=useState(false)
  const [signup,setSignup]=useState(false)
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
  const {error}=await signin(user.email,user.password)
  if(error){
    return setError(true)
  }
  return navigate("/")
}
  return(
    <Container>
    <Row>
      <Col>
      <div className="login-card">
      <div className="login-lockicon"><LockIcon fontSize="large"/></div>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Create an account"
        className="mb-3"
        onChange={()=>setSignup(true)}
      />
      <Form onSubmit={handleSubmit} validated={validate}>
      {signup && <Navigate to="/signup" />}
    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} type="email" placeholder="Enter email" onChange={handleChange} value={user.email} name="email"/>
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>Password</Form.Label>
      <Form.Control required style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} type="password" placeholder="Password" onChange={handleChange} value={user.password} name="password"/>
      {error && <Form.Text className="mb-3 text-danger">Email or password is wrong, try again!</Form.Text>}
    </Form.Group>
    <Button type="submit">
      Login 
    </Button>
  </Form>
      </div>
      </Col>
    </Row>
  </Container>
  )
}