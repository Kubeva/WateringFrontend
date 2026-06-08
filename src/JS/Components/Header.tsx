import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="body-tertiary" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand className="fw-semibold">Wodolejstwo 3000</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
