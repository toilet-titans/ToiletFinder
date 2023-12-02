import React, { useState } from 'react';
import { AutoForm, SelectField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  building_name: String,
  floor_number: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  gender: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const MyForm = () => {
  const [showGenderForm, setShowGenderForm] = useState(false);

  const handleBuildingChange = (value) => {
    // You can add logic here based on the selected building
    // For simplicity, let's assume we want to show the gender field if the building is 'Building A'
    if (value === 'Building A') {
      setShowGenderForm(true);
    } else {
      setShowGenderForm(false);
    }
  };

  return (
    <AutoForm schema={bridge}>
      <SelectField
        name="building_name"
        label="Building Names"
        options={[
          { label: 'Building A', value: 'Building A' },
          { label: 'Building B', value: 'Building B' },
        ]}
        onChange={(value) => {
          handleBuildingChange(value);
        }}
      />
      {showGenderForm && (
        <SelectField
          name="gender"
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
      )}
      {/* Other form fields */}
    </AutoForm>
  );
};

export default MyForm;
