import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const NavBar = () => (
  <Navbar style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Nav>
      <Nav.Link>Home Page</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link>Sign Out</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavBar;