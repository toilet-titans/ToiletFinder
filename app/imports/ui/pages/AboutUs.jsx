import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AboutUs = () => (
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col md={7}>
        <Col className="text-center">
          <h2>About Us</h2>
        </Col>
      </Col>
    </Row>
    <Row className="justify-content-evenly">
      <Card className="h-100" style={{ width: '15rem', backgroundColor: '#33B3B3', color: 'navy' }}>
        <Card.Img variant="top" src="/images/ryder.jpg" />
        <Card.Body>
          <Card.Title>Which way is up?</Card.Title>
          <Card.Text>
            {/* eslint-disable-next-line max-len */}
                  placeholder
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="h-100" style={{ width: '15rem', backgroundColor: '#33B3B3', color: 'navy' }}>
        <Card.Img variant="top" src="/images/ryder.jpg" />
        <Card.Body>
          <Card.Title>Which way is up?</Card.Title>
          <Card.Text>
            {/* eslint-disable-next-line max-len */}
            placeholder
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="h-100" style={{ width: '15rem', backgroundColor: '#33B3B3', color: 'navy' }}>
        <Card.Img variant="top" src="/images/ryder.jpg" />
        <Card.Body>
          <Card.Title>Which way is up?</Card.Title>
          <Card.Text>
            {/* eslint-disable-next-line max-len */}
            placeholder
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="h-100" style={{ width: '15rem', backgroundColor: '#33B3B3', color: 'navy' }}>
        <Card.Img variant="top" src="/images/ryder.jpg" />
        <Card.Body>
          <Card.Title>Which way is up?</Card.Title>
          <Card.Text>
            {/* eslint-disable-next-line max-len */}
            placeholder
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  </Container>
);

export default AboutUs;
