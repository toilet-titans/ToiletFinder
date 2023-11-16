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
        <p>Dr. Moore, please log in with<br/>User: admin@foo.com<br/>Password: changeme1</p>
      </Col>
    </Row>

    <Row className="justify-content-end separator">
      <Col xs={9} className="d-flex flex-column justify-content-center">
        <h1>Featured Bathroom of the Day!</h1>
        <div className="flex-container">
          <Image src="/images/FeaturedRestroomExample.jpeg" width="650px" />
          <Col className="d-flex flex-column">
            <p className="px-3"><strong>Location:</strong></p>
            <p className="px-3"><strong>Floor:</strong></p>
            <p className="px-3"><strong>Rating:</strong></p>
            <p className="px-3"><strong>Random Review:</strong></p>
          </Col>
        </div>
      </Col>
    </Row>

    <Row className="justify-content-end">
      <Col xs={9} className="d-flex flex-column justify-content-center">
        <h1>Campus Map</h1>
        <Image src="/images/campusmap.jpg" width="750px" />
      </Col>
    </Row>
  </Container>
);

export default Landing;
