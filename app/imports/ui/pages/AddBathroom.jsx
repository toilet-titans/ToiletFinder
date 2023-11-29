import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Autocomplete, NumberInput } from '@mantine/core';
import { Buildings } from './Components/Data';
import { Bathroom } from '../../api/schemas/BathroomCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  rating: Number,
  gender: String,
  floor_id: String,
  bathroom_number: SimpleSchema.Integer,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddBathroom = () => {

  const submit = (data, formRef) => {
    const { rating, gender, floor_id, bathroom_number } = data;
    Bathroom.collection.insert(
      { rating, gender, floor_id, bathroom_number },
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
          <Col className="text-center"><h2>Add Bathroom</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><Autocomplete
                    label="Building Names"
                    placeholder="Please pick a building"
                    limit={200}
                    data={[Buildings]}
                    withScrollArea={false}
                    styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                    mt="md"
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
                <Row>
                  <Col><Autocomplete
                    label="Gender"
                    placeholder="Please pick a gender"
                    limit={6}
                    data={['Male', 'Female', 'Genderless']}
                    withScrollArea={false}
                    styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                    mt="md"
                  />
                  </Col>
                  <Col><NumberInput
                    label="Floor Number"
                    description="Please enter floor number"
                    placeholder="Input placeholder"
                    allowDecimal={false}
                    min={1}
                    max={15}
                  />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBathroom;
