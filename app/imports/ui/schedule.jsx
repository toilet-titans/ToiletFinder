import React, { useState } from 'react';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { CheckSquare, XSquareFill } from 'react-bootstrap-icons';

const Schedule = () => {
  const buildings = [
    {
      name: 'Building A',
      bathroomCount: 10,
      bathroomRatings: [4, 5, 3, 4], // Array of bathroom ratings for this building
    },
    {
      name: 'Building B',
      bathroomCount: 15,
      bathroomRatings: [2, 5, 3, 1], // Array of bathroom ratings for this building
    },
    {
      name: 'Building C',
      bathroomCount: 8,
      bathroomRatings: [3, 2, 4], // Array of bathroom ratings for this building
    },
  ];

  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);

  const calculateAverageRating = (bathroomRatings) => {
    const totalRating = bathroomRatings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / bathroomRatings.length;
    return averageRating.toFixed(1); // Round to one decimal place
  };

  return (
    <div>
      <h1>Schedule:</h1>
      <Table striped bordered responsive>
        <thead>
        <tr>
          <th rowSpan={3}>Building</th>
          <th>Bathroom Count</th>
          <th>Average Bathroom Rating</th>
        </tr>
        </thead>
        <tbody>
        {buildings.map((building) => (
          <tr key={building.name}>
            <td>{building.name}</td>
            <td>{building.bathroomCount}</td>
            <td>{calculateAverageRating(building.bathroomRatings)}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Schedule;