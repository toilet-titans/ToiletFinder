/* eslint-disable quote-props */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Building_ } from '../../api/schemas/BuildingCollection';
import { Floor } from '../../api/schemas/FloorCollection';
import { Bathroom } from '../../api/schemas/BathroomCollection';

/**
 * fetch a building entity with its unique id.
 * @param {_id} building_id building's unique _id.
 * @returns [{}] format, where {} is the building data.
 */
function fetch_building(building_id) {
  const building_data = Building_.collection.find({ _id: building_id }).fetch();
  return building_data;
}

/**
 * fetch all existing buildings from the database.
 * @returns [{}, {}, ...] a list of object.
 */
function fetch_building_all() {
  return Building_.collection.find().fetch();
}

/**
 * fetch the entire floor collection.
 * @returns a list of floor entities in the [{}, {}, {}...] format.
 */
function fetch_floor_all() {
  return Floor.collection.find().fetch();
}

/**
 * fetch a floor entity with its unique id.
 * @param {_id} floor_id floor's unique _id.
 * @returns a list of floor entities in the [{}] format.
 */
function fetch_floor(floor_id) {
  return Floor.collection.find({ _id: floor_id }).fetch();
}

/**
 * construct new floor(s) for a building.
 *
 * @param {_id} building_id the parent building _id.
 * @param {int} base_floor the current top floor in the database.
 * @param {int} top_floor the last floor to be constructed.
 * @returns a list of _ids of newly constructed floors.
 */
function floor_construction(building_id, base_floor, top_floor) {
  try {
    // if floor it's a existing floor in the building.
    if (base_floor >= top_floor) {
      return [];
    }
    const new_floor_id = [];
    for (
      let new_floor = base_floor + 1;
      new_floor <= top_floor; new_floor++
    ) {
      new_floor_id.push(Floor.collection.insert({
        building: building_id,
        floor_number: new_floor,
        bathroom: [],
      }));
    }

    return new_floor_id;
  } catch (error) {
    console.error('Error constructing floor:', error);
    throw new Meteor.Error('floor_construction_failed', 'Failed to construct a new floors');
  }
}

/**
 * constructs a building with its floors.
 * @param {string} building_name the name of the building to be constructed.
 * @param {int} floor_count number of floors this building have.
 * @returns a unique building id of this newly constructed building.
 */
function building_construction(building_name, floor_count) {
  try {
    // construct new building.
    const building_id = Building_.collection.insert({
      name: building_name,
      floor_count: floor_count,
      floor_id: [],
    });
    console.log('constructed building base: ', building_id);
    // construct new floors.
    const new_floor_id = floor_construction(
      building_id,
      0,
      floor_count,
    );
    console.log('new building base: ', fetch_building(building_id));
    console.log('new floors constructed: ', new_floor_id);
    // console.log('the floor collection: ', fetch_floor_all());
    // assemble floors and building.
    Building_.collection.update(building_id, {
      $push: {
        floor_id: { $each: new_floor_id },
      },
    });
    console.log('assembled new floors to building. building data: ', fetch_building(building_id));
    return building_id;
  } catch (error) {
    console.error('Error constructing building:', error);
    throw new Meteor.Error('building-construction-failed', 'Failed to construct a new building');
  }
}

/**
 * renovates a existing building by assemble new floors.
 * @param {_id} building_id building's unique _id.
 * @param {[_id]} new_floors list of floor ids to be assembled.
 */
function building_renovation(building_id, new_floors) {
  Building_.collection.update(building_id, {
    $push: {
      floor_id: { $each: new_floors },
    },
  });
}

function fetch_single_bathroom(building_name, floor_number, bathroom_number, bathroom_gender) {
  const building_id = Building_.collection.find({ name: building_name }).fetch()[0]._id;
  const floor_id = Floor.collection.find({ building: building_id, floor_number: floor_number }).fetch[0]._id;

  return Bathroom.collection.findOne({
    building_id: building_id,
    floor_id: floor_id,
    bathroom_number: bathroom_number,
    gender: bathroom_gender,
  }).fetch()[0];
}

/**
 * lookup existing bathroom with the parameters.
 * @param {_id} building_id unique id of the building it's located.
 * @param {_id} floor_id unique id of the floor it's located.
 * @param {int} bathroom_number bathroom number.
 * @param {String} bathroom_gender bathroom type.
 * @returns return its unique _id if found, else return undefined.
 */
function get_bathroom_id(building_id, floor_id, bathroom_number, bathroom_gender) {
  const bathroom = Bathroom.collection.find({
    building_id: building_id,
    floor_id: floor_id,
    bathroom_number: bathroom_number,
    gender: bathroom_gender,
  }).fetch();

  // if bathroom exists.
  if (bathroom.length) {
    return bathroom[0]._id;
  }

  return undefined;
}

function get_building_id(building_name) {
  const building = Building_.collection.find({ name: building_name }).fetch();

  if (building) {
    return building[0]._id;
  }
  return undefined;
}

/**
 * loopup floor up with given parameters.
 * @param {_id} building_id the unique building id of this floor.
 * @param {int} floor_number what floor is this in the building.
 * @returns return its unique _id if found, else return undefined.
 */
function get_floor_id(building_id, floor_number) {
  const floor = Floor.collection.find({ building: building_id, floor_number: floor_number }).fetch();

  if (floor) {
    return floor[0]._id;
  }
  return undefined;
}

Meteor.methods({
  'addBathroom': function (data_) {
    console.log('\naddBathroom method called.');
    check(data_, {
      building_name: String,
      floor: Match.Integer,
      gender: Match.OneOf('Female', 'Male', 'Genderless'),
      rating: Number,
    });
    console.log('data validated');
    const building_row = Building_.collection.find({ name: data_.building_name });
    const building_data = building_row.fetch();
    let building_id;

    console.log('query executed for building lookup, building_data:', building_data);
    // check and construct new building/floor if needed
    // if the building exist.
    // 0: false, > 0: true.
    if (building_data.length) {
      building_id = building_data[0]._id;
      // construct new floors if constructing new bathroom on a new floor.
      console.log('constructing new floors...');
      const new_floor_id = floor_construction(building_id, building_data[0].floor_count, data_.floor_number);
      console.log('new floors constructed: ', new_floor_id);

      // renovate building with new floors if any.
      if (new_floor_id) {
        // renovate building.
        console.log(`renovate building ${building_id} to include floors ${new_floor_id}`);
        building_renovation(building_id, new_floor_id);
        console.log('building renovated successful: ', fetch_building(building_id));
      } else {
        console.log('no renovation needed.');
      }
    } else {
      // no matching building.
      // construct new building and floors
      console.log('start constructing a new building...');
      building_id = building_construction(data_.building_name, data_.floor);
      console.log('new building constructed, id: ', building_id);
    }

    // check if bathroom exists on a existing floor.
    const floor_id = get_floor_id(building_id, data_.floor);
    console.log('get bathroom id...');
    let bathroom_id = get_bathroom_id(building_id, floor_id, data_.bathroom_number, data_.gender);
    console.log('check existing bathroom... bathroom_id: ', bathroom_id);
    // no bathroom found
    if (!bathroom_id) {
      console.log('no bathroom found.');
      console.log('start constructing new bathroom...');
      // construct new bathroom
      bathroom_id = Bathroom.collection.insert({
        rating: [data_.rating],
        gender: data_.gender,
        bathroom_number: fetch_floor(floor_id)[0].bathroom.length + 1,
        floor_id: floor_id,
        building_id: building_id,
      });
      console.log(`bathroom construction successful: ${Bathroom.collection.find({ _id: bathroom_id }).fetch()[0]}`);
      console.log('installing new bathroom on floor ', floor_id);
      // install new bathroom on floor
      Floor.collection.update(floor_id, {
        $push: {
          bathroom: { $each: [].push(bathroom_id) },
        },
      });
      console.log('bathroom successfully installed on floor ', fetch_floor(floor_id));
      // done
    } else {
      throw new Meteor.Error('already-exists', 'This bathroom is in the database.');
    }
    console.log('\naddBathroom done');
  },
  'initializeBuilding': function (building_data) {
    // building_data: { name: , floor_count}
    console.log(building_data);
    check(building_data, {
      name: String,
      floor_count: 1,
    });
    console.log('passed check');
    building_construction(building_data.name, building_data.floor_count);
  },
  'getBuildings': function () {
    const data = fetch_building_all();
    console.log(data);
    return data;
  },
});
