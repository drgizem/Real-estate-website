import { Container, Navbar,Nav,Dropdown } from "react-bootstrap"
import { useAuthContext } from "../context/AuthContext"
import PersonIcon from '@mui/icons-material/Person';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";

export const NavBar=()=>{
const user=useAuthContext()

const handleSignOut=()=>{
  signOut(auth)
  localStorage.setItem("user","")
}
  return (
    <Navbar collapseOnSelect expand="sm">
      <Container className="navbar-container">
        <Navbar.Brand href="/">Real Esty</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
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
             : <Link to="/login" className="navbar-login">Sign in</Link>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}