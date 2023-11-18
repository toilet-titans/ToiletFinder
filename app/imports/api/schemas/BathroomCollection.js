import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class BathroomCollection {
  constructor() {
    this.name = 'BathroomCollection';
    // Create a new collection named bathroom.
    this.collection = new Mongo.Collection('bathroom');

    // Define the schema
    this.schema = new SimpleSchema({
      // make a auto execute function for updating this review.bathroom.id/review.bathroom.id.length
      average_rating: {
        type: Number,
      },
      gender: {
        type: String,
      },
      bathroom_number: {
        type: Number,
      },
      floor_id: {
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

export const Bathroom = new BathroomCollection();
