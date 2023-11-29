import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Building_ } from '../../api/schemas/BuildingCollection';
// import { Stuffs } from '../../api/stuff/Stuff';
// import StuffItem from '../components/StuffItem';
// import LoadingSpinner from '../components/LoadingSpinner';

// File copied from ListStuff.jsx
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */

const Directory = () => {
  const buildingItems = Building_.collection.find({}).fetch();
  console.log(buildingItems);
  const callMethod = async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        Meteor.call('getBuildings', (error, result) => {
          if (error) {
            reject(error.reason || error.message);
          } else {
            resolve(result);
          }
        });
      });

      console.log('Result:', result);
      // Handle the result here
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Buildings</h2>
          </Col>
          <ListGroup>
            <Link to="/Page"><ListGroupItem>Moore Hall</ListGroupItem></Link>
            <Link to="/Page"><ListGroupItem>Kuykendall Hall</ListGroupItem></Link>
            {buildingItems.map((buildingItem) => <ListGroupItem>${buildingItem.name}</ListGroupItem>)}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Directory;
