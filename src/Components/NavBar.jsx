import { Link } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, Container } from 'react-bootstrap';

function NavBar () {
    return (
        <Navbar expand="lg" className="bg-blue-200 border-gray-700 rounded-lg font-mono">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/src/assets/AEU1_scaled.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="AEU Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto !text-blue-400">
                        <Nav.Link as={Link} to="/" className='!text-blue-800 hover:!text-blue-500'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/charts" className='!text-blue-800 hover:!text-blue-500'>
                            Charts
                        </Nav.Link>
                        <Nav.Link as={Link} to="/aboutUs" className='!text-blue-800 hover:!text-blue-500'>
                            About
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;