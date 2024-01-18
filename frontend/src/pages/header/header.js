import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

function Header() {

    return (
        <Container style={{ "width": "100%", maxWidth: "700px" }}>
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ "justifyContent": "space-evenly", "width": "100%" }}>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/learn">Learn</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default Header