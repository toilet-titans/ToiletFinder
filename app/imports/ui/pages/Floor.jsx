import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fetchData from '../../api/query/fetch';

const Floor = () => {
  const { building_id, name } = useParams();
  const { gender, GenderName } = useParams();
  const [floors_data, setFloorsData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('visited. ', name);
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const floorsList = await fetchData('getFloors2', building_id, gender);
        console.log('available Floors: ', floorsList);
        setFloorsData(floorsList);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    fetchFloors();
  }, []);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>{name}, {GenderName} Floors available</h2>
          </Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ListGroup>
              {floors_data.length > 0 ? (
                floors_data.map((floor_number) => (
                  <Link to={`/direction/${floor_number}/${building_id}/${gender}`} key={building_id}>
                    <ListGroupItem>{floor_number}</ListGroupItem>
                  </Link>
                ))
              ) : (
                <div>
                  No genders found. <Link to="/add-bathroom">Add a bathroom</Link>.
                </div>
              )}
            </ListGroup>
          )}
          <Link to="/directory">Back to Directory</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Floor;
