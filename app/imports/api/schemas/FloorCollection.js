import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class FloorCollection {
  constructor() {
    this.name = 'FloorCollection';
    // Create a new collection named floor.
    this.collection = new Mongo.Collection('floor');

    // Define the schema.
    this.schema = new SimpleSchema({
      floor_number: {
        type: Number,
      },
      bathroom: Array,
      'bathroom.$': {
        type: String,
      },
      building_id: {
        type: String,
      },
    });

    // attach to MongoDB for data validation.
    this.collection.attachSchema(this.schema);
  }
}

export const Floor = new FloorCollection();
