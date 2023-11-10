import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/logo.png" width="300px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to our temporary landing page!</h1>
        <p>Admins, log in to see what users see!</p>
        <p>I've initialized Mongo DB with your hawaii.edu email addresses.</p>
        <p>Everyone's password is: changeme1</p>
        <p><strong>NEVER EDIT ON MAIN BRANCH.</strong> Always work on your own branch and never pull request into main without making sure nobody else will be affected.</p>
      </Col>

    </Row>
  </Container>
);

export default Landing;
