import { Meteor } from 'meteor/meteor';
import { getBuildings } from '../imports/api/query/Buildings';

// [{}]
const building_data = Meteor.settings.defaultBathrooms;

for (let i = 0; i < building_data.length; i++) {
  Meteor.call('initializeBuilding', building_data[i], function (error, result) {
    if (error) {
      console.log('There is an error.');
    } else {
      console.log('initializeBuilding call successful.');
    }
  });
}

Meteor.call('getBuildings', function (error, result) {
  if (error) {
    console.log('There is an error.');
  } else {
    console.log('getBuildings call successful.');
  }
});
