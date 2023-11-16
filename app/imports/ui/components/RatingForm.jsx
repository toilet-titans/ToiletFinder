import React from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import RatingSlider from './RatingSlider';

const RatingForm = () => (
  <Container className="d-flex flex-grow-1 justify-content-center align-items-center" fluid>
    <Form className="w-50">
      <Row className="mb-3">
        <Row>
          <Form as={Col} controlId="formGridEmail">
            <Form.Label>Bathroom</Form.Label>
            <Form.Select
              as={Form.Control}
              placeholder="Select Tags"
              className="chosen-select"
              tabIndex="-5"
            >
              <option>zzz</option>
              <optgroup label="building 1">
                <option>zzz</option>
                <option>Nzz</option>
                <option>z</option>
                <option>rrr</option>
              </optgroup>
              <optgroup label="building 2">
                <option>zzz</option>
                <option>Nzz</option>
                <option>z</option>
                <option>rrr</option>
              </optgroup>
              <optgroup label="building 3">
                <option>zzz</option>
                <option>Nzz</option>
                <option>z</option>
                <option>rrr</option>
              </optgroup>
            </Form.Select>
          </Form>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Rating</Form.Label>
            <RatingSlider />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3 h-100" controlId="formGridAddress1">
            <Form.Label className="">Review</Form.Label>
            <textarea className="form-control" placeholder="Enter Review here." />
          </Form.Group>
        </Row>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>

);

export default RatingForm;
