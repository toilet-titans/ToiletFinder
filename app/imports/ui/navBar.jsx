import React from 'react';
import { Nav, Navbar, Row, Image, Col } from 'react-bootstrap';

const navBar = () => (
  <Row>
    <Col className="justify-items-start"><Image src="/images/jisho-logo-v4-dark@2x-e676613b426d34187b61928823730a225b52165aaef99f948bd3dc5fc16fa787.png" className="image-border" />
    </Col>
    <Col className=" justify-items-end mr-auto">
      <Navbar>
        <Nav>
          <Nav.Link>Forum</Nav.Link>
          <Nav.Link>About</Nav.Link>
          <Nav.Link>Theme</Nav.Link>
          <Nav.Link>Log in / Sign up</Nav.Link>
        </Nav>
      </Navbar>
    </Col>
  </Row>
);

export default navBar;