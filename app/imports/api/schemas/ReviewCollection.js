import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ReviewCollection {
  constructor() {
    this.name = 'ReviewCollection';
    // Create a new collection named review.
    this.collection = new Mongo.Collection('review');

    // Define the schema.
    this.schema = new SimpleSchema({
      user_id: {
        type: String,
      },
      bathroom_id: {
        type: String,
      },
      rating: {
        type: Number,
      },
      content: {
        type: String,
      },
    });
    this.collection.attachSchema(this.schema);
  }
}

export const Review = new ReviewCollection();
