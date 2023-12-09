import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fetchData from '../../api/query/fetch';

const Gender = () => {
  const { building_id, name } = useParams();
  const [genders_data, setGendersData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('visited. ', name);
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const gendersList = await fetchData('getGenders', building_id);
        console.log('available genders: ', gendersList);
        setGendersData(gendersList);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    fetchGenders();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>{name} Genders available</h2>
          </Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ListGroup>
              {genders_data.length > 0 ? (
                genders_data.map((gender) => (
                  <Link to={`/Bathroom/${building_id}/${gender}`} key={building_id}>
                    <ListGroupItem>{gender}</ListGroupItem>
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

export default Gender;
