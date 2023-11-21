import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class BuildingCollection {
  constructor() {
    this.name = 'BuildingCollection';
    // Create a new collection.
    this.collection = new Mongo.Collection('building');

    // Define the schema for the BuildingCollection collection.
    this.schema = new SimpleSchema({
      name: {
        type: String,
      },
      floor_count: {
        type: Number,
      },
      floor_id: {
        type: Array,
      },
      'floor_id.$': {
        type: String,
      },
    });

    // attach to MongoDB for data validation.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;

  }
}

export const Building_ = new BuildingCollection();
