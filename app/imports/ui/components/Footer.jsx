import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        ©2023 Toilet Titans
        {' '}
        <br />
        <a href="https://github.com/toilet-titans">
          Github Organization Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
