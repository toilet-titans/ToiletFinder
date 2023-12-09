/* eslint-disable quote-props */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import _ from 'underscore';
import { Building_ } from '../../api/schemas/BuildingCollection';
import { Floor } from '../../api/schemas/FloorCollection';
import { Bathroom } from '../../api/schemas/BathroomCollection';
/**
 * fetch a building entity with its unique id.
 * @param {_id} building_id building's unique _id.
 * @returns [{}] format, where {} is the building data.
 */
export function fetch_building(building_id) {
  const building_data = Building_.collection.find({ _id: building_id }).fetch();
  return building_data;
}

/**
 * fetch all existing buildings from the database.
 * @returns [{}, {}, ...] a list of object.
 */
export function fetch_building_all() {
  return Building_.collection.find().fetch();
}

/**
 * fetch the entire floor collection.
 * @returns a list of floor entities in the [{}, {}, {}...] format.
 */
export function fetch_floor_all() {
  return Floor.collection.find().fetch();
}

/**
 * fetch a floor entity with its unique id.
 * @param {_id} floor_id floor's unique _id.
 * @returns a list of floor entities in the [{}] format.
 */
export function fetch_floor(floor_id) {
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
export function floor_construction(building_id, base_floor, top_floor) {
  try {
    // if floor its na existing floor in the building.
    if (base_floor >= top_floor) {
      console.log('floor exists');
      return [];
    }
    const new_floor_id = [];
    console.log('create new floor');
    for (
      let new_floor = base_floor + 1;
      new_floor <= top_floor; new_floor++
    ) {
      const floor_id_str = Floor.collection.insert({
        building_id: building_id,
        floor_number: new_floor,
        bathroom: [],
      }).toString();
      console.log(floor_id_str);
      new_floor_id.push(floor_id_str);
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
export function building_construction(building_name, floor_count) {
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
 * renovates an existing building by assemble new floors.
 * @param {_id} building_id building's unique _id.
 * @param {[_id]} new_floors list of floor ids to be assembled.
 */
export function building_renovation(building_id, new_floors) {
  Building_.collection.update(building_id, {
    $inc: { floor_count: new_floors.length },
    $push: {
      floor_id: { $each: new_floors },
    },
  });
}

export function fetch_single_bathroom(building_name, floor_number, bathroom_number, bathroom_gender) {
  const building_id = Building_.collection.find({ name: building_name }).fetch()[0]._id;
  const floor_id = Floor.collection.find({ building_id: building_id, floor_number: floor_number }).fetch[0]._id;

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
export function get_bathroom_id(building_id, floor_id, bathroom_number, bathroom_gender) {
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

export function get_building_id(building_name) {
  const building = Building_.collection.find({ name: building_name }).fetch();

  if (building) {
    return building[0]._id;
  }
  return undefined;
}

/**
 * look up floor with given parameters.
 * @param {_id} building_id the unique building id of this floor.
 * @param {int} floor_number what floor is this in the building.
 * @returns return its unique _id if found, else return undefined.
 */
export function get_floor_id(building_id, floor_number) {
  const floor = Floor.collection.find({ building_id: building_id, floor_number: floor_number }).fetch();

  if (floor && (floor.length !== 0)) {
    return floor[0]._id;
  }
  return undefined;
}

export function initializeBuilding(building_data_array) {
  // console.log('passed array check');
  let dup_count = 0;
  let added = 0;
  building_data_array.forEach(element => {
    check(element, {
      name: String,
      floor_count: Match.Integer,
    });
    // console.log('\passed check');
    const building_check = Building_.collection.find({ name: element.name }).fetch();
    if (building_check.length === 0) {
      building_construction(element.name, element.floor_count);
      added++;
    } else {
      // console.log('This building is already in the database: ', building_check[0]._id);
      dup_count++;
    }
  });
  console.log(`building collection count: ${Building_.collection.find().count()}`);
  console.log(`initial array count: ${building_data_array.length}`);
  console.log(`number of duplicate buildings: ${dup_count}`);
  console.log(`number of new buildings added: ${added}`);
}

export function getBuildings() {
  const data = fetch_building_all();
  // console.log('\n', data);
  return data;
}

export function addBathroom(data_) {
  console.log('anything');
  const building_row = Building_.collection.find({ name: data_.building_name });
  const building_data = building_row.fetch();
  let building_id;

  console.log('query executed for building lookup, building_data:', building_data);
  // check and construct new building/floor if needed
  // Check is the building does exist.
  // 0: false, > 0: true.
  if (building_data.length) {
    building_id = building_data[0]._id;
    // construct new floors if constructing new bathroom on a new floor.
    console.log('constructing new floors...');
    const new_floor_id = floor_construction(building_id, building_data[0].floor_count, data_.floor);
    console.log('new floors constructed: ', new_floor_id);

    // renovate building with new floors if any.
    if (new_floor_id.length !== 0 && new_floor_id) {
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

  // check if bathroom exists on an existing floor.
  const floor_id = get_floor_id(building_id, data_.floor);
  console.log('get bathroom id...');
  let bathroom_id = get_bathroom_id(building_id, floor_id, data_.gender);
  console.log('check existing bathroom... bathroom_id: ', bathroom_id);
  // no bathroom found
  if (!bathroom_id) {
    console.log('no bathroom found.');
    console.log('start constructing new bathroom...');
    // construct new bathroom
    bathroom_id = Bathroom.collection.insert({
      rating: [data_.rating],
      gender: data_.gender,
      direction: data_.direction,
      review: data_.review,
      floor_id: floor_id,
      building_id: building_id,
      building_name: data_.building_name,
    });
    const bathroomIdStr = bathroom_id.toString();
    console.log(`bathroom construction successful: ${Bathroom.collection.find({ _id: bathroomIdStr }).fetch()[0]}`);
    console.log('installing new bathroom on floor ', floor_id);
    // install new bathroom on floor
    Floor.collection.update(floor_id, {
      $push: {
        bathroom: { $each: [bathroomIdStr] },
      },
    });
    console.log('bathroom successfully installed on floor ', fetch_floor(floor_id));
    // done
  } else {
    throw new Meteor.Error('already-exists', 'This bathroom is in the database.');
  }
  console.log('\naddBathroom done');
}

export function getFloors(building_id) {
  console.log('\npassed floors1 check');
  const floors = Floor.collection.find({ building_id: building_id }).fetch();
  console.log('\n', floors);
  return floors;
}
export function getFloors2(data_) {
  const floors = Floor.collection.find({ building_id: data_.building_id }).fetch();
  console.log('\npassed floors2 check.');
  const filteredFloors = floors.filter((floor) => floor.bathroom.length > 0); // Filter floors with bathrooms
  const data = filteredFloors.map((bathroom) => {
    const floor_info = fetch_floor(bathroom.building_id);
    return {
      gender: bathroom.gender,
      floor_number: floor_info.map((floor) => floor.floor_number),
      building_name: bathroom.building_name,
    };
  });
  return data;
}

export function getBathrooms2(data_) {
  const bathrooms = Bathroom.collection.find({ building_id: data_.building_id, gender: data_.gender }).fetch();
  const data = bathrooms.map((bathroom) => ({
    _id: bathroom._id,
    rating: bathroom.rating,
    gender: bathroom.gender,
    direction: bathroom.direction,
    floor_number: fetch_floor(bathroom.floor_id)[0].floor_number,
    review: bathroom.review,
    building_name: bathroom.building_name,
  }));
  return data;
}

export function getGenders(building_id) {
  // get all floors
  // foreach get bathroom
  // pass in to uniq
  const building_floors = Floor.collection.find({ building_id: building_id }).fetch();
  console.log('building_floors: ', building_floors);
  const allBathrooms = building_floors.map((floorId) => Bathroom.collection.find({ floor_id: floorId._id }).fetch());
  console.log('all bathroom of the building: ', allBathrooms);
  const uniqueGenders = _.uniq(_.pluck(_.flatten(allBathrooms), 'gender'));
  console.log('unique genders: ', uniqueGenders);
  return uniqueGenders;
}

export function getBuildingNames() {
  console.log('getBuildingsNames called');
  const buildings = fetch_building_all();
  const names = _.map(buildings, 'name');
  console.log('getBuildingsNames called successful.');
  return names;
}

export function getBathrooms(floor_id) {
  console.log('\npassed check.');
  const bathrooms = Bathroom.collection.find({ floor_id: floor_id }).fetch();
  console.log('\n', bathrooms);
  return bathrooms;
}
