/* eslint-disable quote-props */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import * as logic from './functions';

// env variables
const BATHROOM_GENDER = Meteor.settings.env.BATHROOM_GENDER;

Meteor.methods({
  'addBathroom': function (data_) {
    console.log('floor number :', data_.floor);
    console.log('\naddBathroom method called.');
    check(data_, {
      building_name: String,
      floor: Match.Integer,
      gender: Match.OneOf(...BATHROOM_GENDER),
      rating: Number,
      review: String,
      direction: String,
    });
    console.log('data validated');
    logic.addBathroom(data_);
  },
  'initializeBuilding': function (building_data_array) {
    check(building_data_array, Array);
    logic.initializeBuilding(building_data_array);
  },
  'getBuildings': function () {
    return logic.getBuildings();
  },
  'getFloors': function (building_id) {
    check(building_id, String);
    return logic.getFloors(building_id);
  },
  'getFloors2': function (data_) {
    check(data_, {
      building_id: String,
      gender: Match.OneOf(...BATHROOM_GENDER),
    });
    return logic.getFloors2(data_);
  },
  'getBathrooms': function (floor_id) {
    check(floor_id, String);
    return logic.getBathrooms(floor_id);
  },
  'getBathrooms2': function (data_) {
    check(data_, {
      building_id: String,
      gender: Match.OneOf(...BATHROOM_GENDER),
    });
    return logic.getBathrooms2(data_);
  },
  'getGenders': function (building_id) {
    check(building_id, String);
    return logic.getGenders(building_id);
  },
  'getBuildingNames': function () {
    return logic.getBuildingNames();
  },
});
