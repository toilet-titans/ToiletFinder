import { Meteor } from 'meteor/meteor';

const callWithPromise = (method, ...args) => new Promise((resolve, reject) => {
  Meteor.call(method, ...args, (err, res) => {
    if (err) {
      reject('Something went wrong');
    } else {
      resolve(res);
    }
  });
});

const fetchData = async (method, ...args) => {
  try {
    const result = await callWithPromise(method, ...args);
    return result;
  } catch (error) {
    console.error(`Error fetching data for ${method}:`, error);
    throw error;
  }
};

export default fetchData;
