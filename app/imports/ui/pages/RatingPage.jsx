import React from 'react';
import { Container } from 'react-bootstrap';
import RatingForm from '../components/RatingForm';

const RatingPage = () => (
  <Container className="py-5" id="rating-page">
    <RatingForm />
  </Container>
);

export default RatingPage;
