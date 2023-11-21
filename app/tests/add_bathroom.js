import { Meteor } from 'meteor/meteor';

const test_data = [
  {
    building_name: 'building A',
    floor: 3,
    // bathroom_number: 302,
    gender: 'Female',
    rating: 3,
  },
  {
    building_name: 'building B',
    floor: 2,
    // bathroom_number: 201,
    gender: 'Male',
    rating: 5,
  },
  {
    building_name: 'building C',
    floor: 4,
    // bathroom_number: 404,
    gender: 'Female',
    rating: 2.5,
  },
];

for (let i = 0; i < test_data.length; i++) {
  Meteor.call('addBathroom', test_data[i], function (error, result) {
    if (error) {
      console.log(error.reason);
    } else {
      console.log('Bathroom added successfully');
    }
  });
}
