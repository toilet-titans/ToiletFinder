import React from 'react';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const RatingSlider = () => {

  const [value, setValue] = React.useState(50);

  return (
    <Form.Group>
      <RangeSlider
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </Form.Group>
  );

};

export default RatingSlider;
