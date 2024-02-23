import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function SiteNav() {
  return (
    <Navbar className="bg-body-tertiary mb-1" data-bs-theme="dark" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          QuickFields
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" data-cy="home" to="/">
              Home
            </Link>
            <Link className="nav-link" data-cy="templates" to="/templates">
              Templates
            </Link>
            <Link className="nav-link" data-cy="create" to="/create">
              Create
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNav;
