import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
// import { Stuffs } from '../../api/stuff/Stuff';
// import StuffItem from '../components/StuffItem';
// import LoadingSpinner from '../components/LoadingSpinner';

// File copied from ListStuff.jsx
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Profile = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col md={7}>
        <Col className="text-center">
          <h2>Profile</h2>
          <p>Use this component to work on profile page. (Copy and paste your profile code from your branch onto this page and continue editing. We'll move access to profile page off of the nav item soon.</p>
        </Col>
      </Col>
    </Row>
  </Container>
);

export default Profile;
