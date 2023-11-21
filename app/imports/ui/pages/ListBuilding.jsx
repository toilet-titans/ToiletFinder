import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Building_ } from '../../api/schemas/BuildingCollection';
import BuildingItem from '../components/BuildingItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListBuilding = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, buildings } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Building_.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const buildingItems = Building_.collection.find({}).fetch();
    return {
      buildings: buildingItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Building Stuff</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Floor Count</th>
                <th>Floor ID</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => <BuildingItem key={building.name} building={building} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListBuilding;
