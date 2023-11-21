import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List building table. See pages/Listbuilding.jsx. */
const BuildingItem = ({ building }) => (
  <tr>
    <td>{building.name}</td>
    <td>{building.floor_count}</td>
    <td>{building.floor_id}</td>
    <td>
      <Link to={`/edit/${building.name}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
BuildingItem.propTypes = {
  building: PropTypes.shape({
    name: PropTypes.string,
    floor_count: PropTypes.number,
    floor_id: PropTypes.string,
  }).isRequired,
};

export default BuildingItem;
