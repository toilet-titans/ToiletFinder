import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import Schedule from '../components/EditAddTable';
import Personal from '../components/personalEditTable';
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
          <Personal />
          <h2>Saved Bathrooms:</h2>
          <Schedule />
        </Col>
      </Col>
    </Row>
  </Container>
);

export default Profile;
