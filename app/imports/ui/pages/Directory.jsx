import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Landing from './Landing';
// import { Stuffs } from '../../api/stuff/Stuff';
// import StuffItem from '../components/StuffItem';
// import LoadingSpinner from '../components/LoadingSpinner';

// File copied from ListStuff.jsx
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Directory = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col md={7}>
        <Col className="text-center">
          <h2>Buildings</h2>
        </Col>
        <ListGroup>
          <Link to="/Bathroom"><ListGroupItem>Moore Hall</ListGroupItem></Link>
          <Link to="/Bathroom"><ListGroupItem>Kuykendall Hall</ListGroupItem></Link>
        </ListGroup>
      </Col>
    </Row>
  </Container>
);

export default Directory;
