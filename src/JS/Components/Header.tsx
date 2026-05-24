import { Container, Navbar } from "react-bootstrap";
import '../../CSS/header.css';

function Header() {
  return (
  <Navbar className="header" expand="lg">
    <Container>
      <Navbar.Brand className="nav-link">Watering</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
  </Navbar>
  )
}

export default Header;