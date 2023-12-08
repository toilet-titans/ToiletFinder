import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fetchData from '../../api/query/fetch';

const Directory = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsData = await fetchData('getBuildings');
        setBuildings(buildingsData);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Buildings</h2>
          </Col>
          {loading ? (
            <div>Loading...</div> // Or any other loading indicator
          ) : (
            <ListGroup>
              {buildings.map((building) => (
                <Link
                  to={`/gender/${building._id}/${encodeURIComponent(building.name)}`}
                  key={building._id}
                >
                  <ListGroupItem>{building.name}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Directory;
