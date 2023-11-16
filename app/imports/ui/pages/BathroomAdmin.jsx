import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, ListGroupItem, Row, Table } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const BathroomAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Stuffs.collection.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Users</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Reviews</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to="/Profile"><ListGroupItem>Reyn</ListGroupItem></Link></td>
                <td><Link to="/review&=001"><ListGroupItem>8</ListGroupItem></Link></td>
                <td>reynseki@hawaii.edu</td>
              </tr>
              <tr>
                <td><Link to="/Profile"><ListGroupItem>Marques</ListGroupItem></Link></td>
                <td><Link to="/review&=001"><ListGroupItem>10</ListGroupItem></Link></td>
                <td>marques@hawaii.edu</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default BathroomAdmin;
