import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fetchData from '../../api/query/fetch';

const Bathroom = () => {

  const { building_id, gender } = useParams();
  const [bathroom_data, serBathroomData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('visited. ');
  useEffect(() => {
    const fetchBathrooms = async () => {
      try {
        const data = {
          building_id: building_id,
          gender: gender,
        };
        const bathroomList = await fetchData('getBathrooms2', data);
        console.log('available bathrooms: ', bathroomList);
        serBathroomData(bathroomList);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchBathrooms();
  }, []); // Empty dependency array ensures the effect runs once after the initial render
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Bathrooms</h2>
          </Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ListGroup>
              {bathroom_data.length > 0 ? (
                bathroom_data.map((bathroom) => (
                  <Row>
                    <li>
                      Rating: {bathroom.rating},
                      gender: {bathroom.gender},
                      bathroom number: {bathroom.bathroom_number},
                      floor: {bathroom.floor_number}
                    </li>
                  </Row>
                ))
              ) : (
                <div>
                  No bathroom found. <Link to="/add-bathroom">Add a bathroom</Link>.
                </div>
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Bathroom;
