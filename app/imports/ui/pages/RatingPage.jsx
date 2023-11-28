import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Recipes } from '../../api/Recipes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  dishName: String,
  description: String,
  image: String,
  ingredients: String,
  equipment: String,
  instructions: String,
  dietaryRestriction: String,
  costPerServing: SimpleSchema.Integer,
  noServings: SimpleSchema.Integer,
  timeToMake: SimpleSchema.Integer,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddRecipe page for adding a single document. */
const AddRecipe = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const {
      dishName,
      description,
      image,
      ingredients,
      equipment,
      instructions,
      dietaryRestriction,
      costPerServing,
      noServings,
      timeToMake,
    } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert(
      {
        owner,
        dishName,
        description,
        image,
        ingredients,
        equipment,
        instructions,
        dietaryRestriction,
        costPerServing,
        noServings,
        timeToMake,
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe added successfully', 'success');
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
          <Col className="text-center"><h2>Add Recipe</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="dishName" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <LongTextField name="description" />
                <Row>
                  <Col><TextField name="equipment" /></Col>
                  <Col><TextField name="ingredients" /></Col>
                </Row>
                <LongTextField name="instructions" />
                <Row>
                  <Col><TextField name="dietaryRestriction" /></Col>
                  <Col><TextField name="costPerServing" /></Col>
                  <Col><TextField name="noServings" /></Col>
                  <Col><TextField name="timeToMake" /></Col>
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

export default AddRecipe;
