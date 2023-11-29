import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, SelectField, NumField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import fetchData from '../../api/query/fetch';

// fetchData is basically a call to backend, as long as there is a matching method in the backend,
// itll run. So insert also works because there is one method for addBathroom.
// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  building_name: String,
  rating: String,
  gender: String,
  floor_number: SimpleSchema.Integer,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddContact = () => {
  // building_names: [str, str, ...]
  const [building_names, setBuildingNames] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('visited. ', building_names);
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const names = await fetchData('getBuildingNames');
        console.log('available buildings: ', names);
        setBuildingNames(names);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchGenders();
  }, []); // Empty dependency array ensures the effect runs once after the initial render
  const submit = (data, formRef) => {
    console.log('submit ran.');
    const { building_name, rating, gender, floor_number } = data;
    const insert_data = {
      building_name: building_name,
      floor: floor_number,
      gender: gender,
      rating: parseFloat(rating),
    };
    fetchData('addBathroom', insert_data);
    formRef.reset();
  };

  const validateForm = (model) => {
    try {
      bridge.getErrorMessages(model);
      return {};
    } catch (error) {
      return error.details.reduce((acc, cur) => {
        acc[cur.name] = cur.message;
        return acc;
      }, {});
    }
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Bathroom</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} validator={validateForm}>
            {loading ? (
              <div>Loading...</div> // Or any other loading indicator
            ) : (
              <Card>
                <Card.Body>
                  <Row>
                    <Col><SelectField
                      name="building_name"
                      label="Building Names"
                      placeholder="Please pick a building"
                      options={building_names.map(name => ({ label: name, value: name }))}
                    />
                    </Col>
                    <Col><SelectField
                      name="rating"
                      label="Rating Number"
                      placeholder="Pick a rating"
                      limit={6}
                      options={[
                        { label: '0', value: 0 },
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                      ]}
                    />
                    </Col>
                  </Row>
                  <Row>
                    <Col><SelectField
                      name="gender"
                      label="Gender"
                      placeholder="Please pick a gender"
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Genderless', value: 'Genderless' },
                      ]}
                      // styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                    />
                    </Col>
                    <Col><NumField
                      name="floor_number"
                      label="Floor Number"
                      placeholder="Please enter floor number"
                    />
                    </Col>
                  </Row>
                  <SubmitField />
                  <ErrorsField />
                </Card.Body>
              </Card>
            )}

          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContact;
