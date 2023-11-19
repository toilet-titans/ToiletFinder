import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Autocomplete, Textarea } from '@mantine/core';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  BuildingFloor: String,
  RatingNumber: String,
  Gender: String,
  FloorNumber: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const BathroomCard = () => {

  const submit = (data, formRef) => {
    const { firstName, lastName, address, image, description } = data;
    const owner = Meteor.user().username;
    Contacts.collection.insert(
      { firstName, lastName, address, image, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Review</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <h1>Building Name</h1>
                  </Col>
                  <Col>
                    <h1>Gender</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1>Floor Number</h1>
                  </Col>
                  <Col>
                    <h1>Bathroom Number</h1>
                  </Col>
                </Row>
                <Row>
                  <Col><Textarea
                    label="Add Comment"
                    placeholder="Write Comment"
                  />
                  </Col>
                  <Col><Autocomplete
                    label="Rating Number"
                    placeholder="Pick enter a rating"
                    limit={6}
                    data={['0', '1', '2', '3', '4', '5']}
                    withScrollArea={false}
                    styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                    mt="md"
                  />
                  </Col>
                </Row>
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default BathroomCard;
