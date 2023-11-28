import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class RecipesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'Recipes';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      dishName: String,
      description: String,
      image: String,
      ingredients: String,
      equipment: String,
      instructions: String,
      dietaryRestriction: String,
      costPerServing: SimpleSchema.Integer,
      noServings: SimpleSchema.Integer,
      timeToMake: SimpleSchema.Integer,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    // we have added a publication for everyone to see.
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.generalPublicationName = `${this.name}.publication.general`;
  }
}
/**
 * The singleton instance of the StuffsCollection.
 * @type {RecipesCollection}
 * @param {generalPublicationName}
 * @param {userPublicationName}
 * @param {adminPublicationName}
 */
export const Recipes = new RecipesCollection();
