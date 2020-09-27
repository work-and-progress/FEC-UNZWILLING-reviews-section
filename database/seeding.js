/*
  https://mongoosejs.com/docs/models.html
  db.reviews.find().pretty() to view data
  db.reviews.deleteMany({}) to drop all data
  db.dropDatabase(); to drop database
  db.drop.reviews()
  db.reviews.findOne({product_id: 1})
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
      reviews: [],
      aggregate_star_rating: null
    };

    var totalStarsForOneProduct = 0;
    var randomNumberOfReviewsPerProduct = faker.random.number({ 'min': 1, 'max': 25 });
      for (var j = 0; j < randomNumberOfReviewsPerProduct; j++) {
        var oneReview = {
          review_id: j+1,
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
        totalStarsForOneProduct += oneReview.star_rating;
        seedling.reviews.push(oneReview);
      }

    var unroundedAverageStar = totalStarsForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_star_rating = Math.round(unroundedAverageStar * 2) / 2;

    hugeSeedingArray.push(seedling);
  }
  database.save(hugeSeedingArray)
  .then(() => {
    console.log('database/seeding.js: Seeding complete! Bye bye 😙');
    database.db.close();
  });
})();




