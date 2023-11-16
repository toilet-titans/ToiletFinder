import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import ExampleWithProviders from '../components/EditAddTable';
import Example2 from '../components/personalEditTable';
// import { Stuffs } from '../../api/stuff/Stuff';
// import StuffItem from '../components/StuffItem';
// import LoadingSpinner from '../components/LoadingSpinner';

// File copied from ListStuff.jsx
/* Renders a table containing all Stuff documents. Use <StuffItem> to render each row. */
const Profile = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col md={7}>
        <Col className="text-center">
          <h2>Profile</h2>
          <h2>Your Reviews:</h2>
          <Example2 />
          <h2>Saved Bathrooms:</h2>
          <ExampleWithProviders />
        </Col>
      </Col>
    </Row>
  </Container>
);

export default Profile;
