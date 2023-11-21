import { Meteor } from 'meteor/meteor';

// [{}]
const building_data = Meteor.settings.defaultBathrooms;
let returned_data;

console.log('building_data.length: ', building_data.length);

Meteor.call('initializeBuilding', building_data, function (error, result) {
  if (error) {
    console.log('There is an error.', error.reason);
  } else {
    returned_data = result;
    console.log('initializeBuilding call successful.');

  }
});

// Meteor.call('getBuildings', function (error, result) {
//   if (error) {
//     console.log('There is an error.');
//   } else {
//     data = result;
//     console.log(data);
//   }
// }
// );

// Meteor.call('getFloors', returned_data[0]._id, function (error, result) {

//   if (error) {
//     console.log('There is an error.');
//   } else {
//     returned_data = result;
//     console.log('getFloor call successful. result returned: ', returned_data);
//   }
// });

// Meteor.call('getBathrooms', returned_data[0]._id, function (error, result) {
//   if (error) {
//     console.log('There is an error.');
//   } else {
//     returned_data = result;
//     console.log('getBathroom call successful. result returned: ', returned_data);
//   }
// });
