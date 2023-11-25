import React from 'react';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';

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

    <Row className="background-img1">
      <Col xs={1} className="home-align1">
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src="/images/FeaturedRestroomExample.jpeg" />
          <Card.Body>
            <Card.Title>Featured Bathroom of the Day!</Card.Title>
            <Card.Text>
              {/* eslint-disable-next-line max-len */}
              <h6>Location:</h6>
              <h6>Floor:</h6>
              <h6>Rating:</h6>
              <h6>Featured Review:</h6>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={1} className="home-align2">
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src="/images/RunningToilet1.jpg" />
          <Card.Body>
            <Card.Title>Mission Statement</Card.Title>
            <Card.Text>
              {/* eslint-disable-next-line max-len */}
              As fellow students at UH Manoa, we understand how hard it can be to find a clean bathroom to use, especially if you are a new student.  That is why we came up with Toilet Finder!  This app allows for students of any year to easily find a bathroom to use.  Using a rating and review sysem, it allows for students to provide their opinions on restrooms across campus for their fellow classmates to look at.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* <Row className="justify-content-end row-coloring1">
      <Col xs={9} className="d-flex flex-column justify-content-center">
        <h1>Campus Map</h1>
        <Image src="/images/campusmap.jpg" width="750px" />
      </Col>
    </Row> */}
  </Container>
);

export default Landing;
