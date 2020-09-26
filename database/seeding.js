/*
  https://mongoosejs.com/docs/models.html
  db.reviews.find().pretty() to view data
  db.reviews.deleteMany({}) to drop all data
  db.dropDatabase(); to drop database
  db.drop.reviews()
  ----------------------------------------------------
*/

const faker = require('faker');
var database = require('./index.js');
//const mongoose = require('mongoose');

(function seeding (){
  // creating 100 entries into our database, all of them are called seedling
  var hugeSeedingArray = [];
  for (var i = 1; i < 101; i++) {
    var seedling = {
      product_id: i,
      reviews: []
    };

    var randomNumberOfReviewsPerProduct = faker.random.number({ 'min': 1, 'max': 25 });
      for (var j = 1; j < randomNumberOfReviewsPerProduct; j++) {
        var oneReview = {
          review_id: j,
          user_id: faker.random.number({ 'min': 10000, 'max': 90000}),
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
        }
        seedling.reviews.push(oneReview);
      }
    hugeSeedingArray.push(seedling);
  }
  database.save(hugeSeedingArray)
  .then(() => {
    console.log('database/seeding.js: Seeding complete!');
    database.db.close();
  });
})();




