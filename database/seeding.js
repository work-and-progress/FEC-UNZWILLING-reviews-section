/* ----------------------------------------------------
  db.reviews.find().pretty() to view data
  db.reviews.deleteMany({}) to drop all data
  db.dropDatabase(); to drop database
  db.drop.reviews() ?
 https://mongoosejs.com/docs/models.html
*/

const faker = require('faker');
var db = require('./index.js');

(function seeding (){
  // creating 100 entries into our database, all of them are called seedling
  var hugeSeedingArray = [];
  for (var i = 1; i < 101; i++) {
    const seedling = {
      product_id: i, // numbering convention for Product ID decided on by whole team
      review_id: faker.random.number({ 'min': 1, 'max': 100 }),
      user_id: faker.random.number({ 'min': 1, 'max': 100 }),
      review_content: faker.lorem.paragraph(),
      review_title: faker.lorem.sentence(),
      review_date: faker.date.recent(),
      review_recommended: faker.random.boolean(),
      original_post_location: faker.lorem.words(),
      frequency_of_use: faker.lorem.word(),
      quality_rating: faker.random.number({ 'min': 1, 'max': 5 }),
      value_rating: faker.random.number({ 'min': 1, 'max': 5 }),
      star_rating: faker.random.number({ 'min': 1, 'max': 5 }),
      helpful_yes: faker.random.number({ 'min': 1, 'max': 1000 }),
      helpful_no: faker.random.number({ 'min': 1, 'max': 500})
    };
    hugeSeedingArray.push(seedling);
  }
  db.save(hugeSeedingArray);
})();
console.log('Seeding complete!')



