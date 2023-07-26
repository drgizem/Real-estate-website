import { Container, Navbar,Nav,Dropdown } from "react-bootstrap"
import { useAuthContext } from "../context/AuthContext"
import PersonIcon from '@mui/icons-material/Person';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const NavBar=()=>{
const user=useAuthContext()

const handleSignOut=()=>{
  signOut(auth)
  localStorage.setItem("user","")
}
  return (
    <Navbar>
      <Container className="navbar-container">
        <Navbar.Brand href="/">Real Estate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/rent">Rent</Nav.Link>
            <Nav.Link href="/buy">Buy</Nav.Link>
          </Nav>
          <div>
            {user.email ? 
            <Dropdown className="dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <PersonIcon/>
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item>{user.email}</Dropdown.Item>
              <Dropdown.Item>Saved Homes</Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
             : <Nav.Link href="login">Sign in</Nav.Link>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}