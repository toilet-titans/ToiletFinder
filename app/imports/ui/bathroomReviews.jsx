import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Table, Button } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';


const BathroomReviews = () => {
  const [reviews, setReviews] = useState([
    {
      buildingName: 'Post 12312',
      bathroomNumber: 101,
      rating: 5,
      recommended: true,
    },
    {
      buildingName: 'Moore Hall',
      bathroomNumber: 202,
      rating: 1,
      recommended: false,
    },
    {
      buildingName: 'Library',
      bathroomNumber: 303,
      rating: 3,
      recommended: true,
    },
  ]);

  const handleRecommendationChange = (bathroomIndex, recommendedValue) => {
    const updatedReviews = [...reviews];
    updatedReviews[bathroomIndex].recommended = recommendedValue;
    setReviews(updatedReviews);
  };

  return (
    <div>
      <h1>Your bathroom reviews:</h1>
      <Table className="table table-hover">
        <thead className="thead-dark">
      <tr>
        <th scope="col">Building Name</th>
        <th scope="col">Bathroom Number</th>
        <th scope="col">Rating</th>
        <th scope="col">Recommended</th>
      </tr>
      </thead>
      <tbody>
      {reviews.map((review, index) => (
        <tr key={index}>
          <td>{review.buildingName}</td>
          <td>{review.bathroomNumber}</td>
          <td>
            <StarRatingComponent
              name="bathroomRating"
              value={review.rating}
              starCount={5}
              editing={false}
            />
          </td>
          <td>
            <div className="recommendation-buttons">
              <Button
                style={{
                  backgroundColor: review.recommended ? '#28a745' : 'white',
                }}
                onClick={() => handleRecommendationChange(index, true)}
              >
                <HandThumbsUp/>
              </Button>
              <Button
                style={{
                  backgroundColor: review.recommended ? 'white' : 'red',
                }}
                onClick={() => handleRecommendationChange(index, false)}
              >
                <HandThumbsDown/>
              </Button>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
    </div>
  );
};

export default BathroomReviews;