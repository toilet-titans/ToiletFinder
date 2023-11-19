import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Autocomplete, NumberInput } from '@mantine/core';


// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  BuildingFloor: String,
  RatingNumber: String,
  Gender: String,
  FloorNumber: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddContact = () => {

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
          <Col className="text-center"><h2>Add Bathroom</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><Autocomplete
                    label="Building Names"
                    placeholder="Please pick a building"
                    limit={200}
                    data={['Administration Services Building 1',
                      'Administration Services Building 2',
                      'Agricultural Engineering Institute',
                      'Agricultural Science',
                      'Air Force ROTC Building',
                      'Andrews Outdoor Theatre',
                      'Architecture School',
                      'Army ROTC Building',
                      'Art Building',
                      'Bachman Annex 2',
                      'Bachman Annex 9–13',
                      'Bachman Hall',
                      'Bilger Addition',
                      'Bilger Annex',
                      'Bilger Hall',
                      'Biomedical Sciences',
                      'Building 37',
                      'Burns Hall',
                      'Campus Center',
                      'Campus Services',
                      'Castle Annex',
                      'Castle Memorial',
                      'Center for Korean Studies',
                      'C-MORE Hale (Center for Microbial Oceanography: Research and Education)',
                      'Cooke Field',
                      'Crawford Hall',
                      'Dance Building',
                      'Dean Hall',
                      'Diving Safety Program',
                      'Dole Street Offices',
                      'Dole Street Parking Structure',
                      'Edmondson Hall',
                      'Energy House',
                      'Engineering Quad',
                      'Environmental Health and Safety Offices',
                      'Environmental Protection Facility',
                      'Everly Hall',
                      'Federal Credit Union',
                      'Financial Management Office',
                      'Food Science and Technology',
                      'Frear Hall',
                      'Gartley Hall',
                      'Gateway House',
                      'George Hall',
                      'Gilmore Hall',
                      'Gym 1',
                      'Gym 2',
                      'Hale Aloha Lehua',
                      'Hale Aloha ʻIlima',
                      'Hale Aloha Mokihana',
                      'Hale Aloha Lokelani',
                      'Hale Aloha Cafeteria',
                      'Hale Ānuenue',
                      'Hale Halawai',
                      'Hale Kahawai',
                      'Hale Kuahine',
                      'Hale Laulima',
                      'Hale Mānoa',
                      'Hale Noelani',
                      'Hale Wainani',
                      'Hamilton Library',
                      'Hawaiʻi English Language Program',
                      'Hawaiʻi Hall',
                      'Hawaiʻi Institute of Geophysics',
                      'Health Services',
                      'Hemenway Hall',
                      'Henke Hall',
                      'Holmes Hall',
                      'Horticulture Greenhouses',
                      'Horticulture Headhouse',
                      'Information Technology Center',
                      'Institute for Astronomy',
                      'Jefferson Hall',
                      'John A. Burns School of Medicine',
                      'Johnson Hall A',
                      'Johnson Hall B',
                      'Kahanamoku Pool',
                      'Kamakakūokalani Center for Hawaiian Studies',
                      'Kauʻiokahaloa Iki Faculty Housing',
                      'Kauʻiokahaloa Nui Faculty Housing',
                      'Keller Hall',
                      'Kennedy Theatre',
                      'KHET TV',
                      'Klum Gym',
                      'Krauss Annex 19',
                      'Krauss Annex U',
                      'Krauss Hall',
                      'Kuykendall Annex',
                      'Kuykendall Hall',
                      'Lab School Portables 1–4',
                      'Landscaping',
                      'Law Library',
                      'Law School',
                      'Lincoln Hall',
                      'Lincoln Hall Annex',
                      'Magoon Facility',
                      'Maile Way Annex',
                      'Marine Sciences Building',
                      'Miller Hall',
                      'Miller Hall Annex',
                      'Moore Hall',
                      'Multipurpose Building',
                      'Murakami Stadium',
                      'Music Building Complex',
                      'National Marine Fisheries Service',
                      'Newman Center',
                      'NREM Greenhouse',
                      'Office of Procurement and Real Property Management',
                      'Orvis Auditorium',
                      'Pacific Biosciences Research Center',
                      'Pacific Ocean Science and Technology',
                      'Paradise Palms Cafe',
                      'Parking Structure',
                      'Physical Education Athletic Complex',
                      'Physical Plant Building',
                      'Physical Science Building',
                      'Pope Laboratory',
                      'Practice Fields',
                      'Public Safety',
                      'Queen Liliʻuokalani Center for Student Services',
                      'Sakamaki Hall',
                      'Saunders Hall',
                      'Sherman Laboratory',
                      'Shidler College of Business',
                      'Shops',
                      'Sinclair Annex',
                      'Sinclair',
                      'Snyder Hall',
                      'Softball Stadium',
                      'Spalding Hall',
                      'Speech Pathology/Audiology',
                      'St. John Plant Science Lab',
                      'Stan Sheriff Center',
                      'Tennis Courts',
                      'Thrift Shop',
                      'Transportation Services',
                      'University High School 1',
                      'University High School 2',
                      'University High School 3',
                      'University of Hawaiʻi Press',
                      'USDA Fruit Fly Lab',
                      'Waʻahila Faculty Housing',
                      'Warehouse',
                      'Warrior Recreation Center',
                      'Watanabe Hall',
                      'Webster Hall',
                      'Wist Annex 1',
                      'Wist Hall']}
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

export default AddContact;
