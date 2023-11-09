import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './navBar.jsx';
import GenderSelector from './genderSelector.jsx';
import BathroomReviews from './bathroomReviews.jsx';
import Schedule from './schedule.jsx';
import Footer from './footer.jsx';
import ComboBox from './search.jsx';
export const App = () => (
  <Container>
    <NavBar />
    <h1>Profile Page</h1>
    <br />
    <GenderSelector />
    <br />
    <BathroomReviews />
    <br />
    <Schedule />
    <ComboBox />
    <Footer />
  </Container>
);