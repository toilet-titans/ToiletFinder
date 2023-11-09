import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-3 fixed-bottom bg-dark text-white">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; Toilet Titans 2023</p>
          </Col>
          <Col md={6} className="text-end">
            <a href="#" className="text-white">Privacy Policy</a>
            &nbsp;&nbsp;
            <a href="#" className="text-white">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;