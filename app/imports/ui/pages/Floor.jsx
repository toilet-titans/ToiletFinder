import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fetchData from '../../api/query/fetch';

const Floor = () => {
  const { building_id, name } = useParams();
  const [Floors_data, setFloorsData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('visited. ', name);
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const FloorsList = await fetchData('getFloors', building_id);
        console.log('available Floors: ', FloorsList);
        setFloorsData(FloorsList);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchFloors();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>{name} Floors available</h2>
          </Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ListGroup>
              {Floors_data.length > 0 ? (
                Floors_data.map((floor) => (
                  <Link to={`/Bathroom/${building_id}/${floor}`} key={building_id}>
                    <ListGroupItem>{floor}</ListGroupItem>
                  </Link>
                ))
              ) : (
                <div>
                  No Floors found. <Link to="/add-bathroom">Add a bathroom</Link>.
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
