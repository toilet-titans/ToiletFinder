import React from 'react';
import { Nav, Navbar, Row } from 'react-bootstrap';

const NavBar = () => (
  <Row>
    <Navbar>
      <Nav className="me-auto justify-content-start">
        <Nav.Link>Home Page</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
        <Nav.Link>Sign Out</Nav.Link>
      </Nav>
    </Navbar>
  </Row>
);

export default NavBar;