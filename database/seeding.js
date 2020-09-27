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
const database = require('./index.js');
// const mongoose = require('mongoose');

(function seeding() {
  // creating 100 entries into our database, all of them are called seedling
  const hugeSeedingArray = [];
  for (let i = 1; i < 101; i += 1) {
    const seedling = {
      product_id: i,
      reviews: [],
      aggregate_star_rating: null,
    };

    let totalStarsForOneProduct = 0;
    const randomNumberOfReviewsPerProduct = faker.random.number({ min: 1, max: 25 });
    for (let j = 0; j < randomNumberOfReviewsPerProduct; j += 1) {
      const oneReview = {
        review_id: j + 1,
        user_id: faker.random.number({ min: 10000, max: 90000 }),
        review_content: faker.lorem.paragraph(),
        review_title: faker.lorem.sentence(),
        review_date: faker.date.recent(),
        review_recommended: faker.random.boolean(),
        original_post_location: faker.lorem.words(),
        frequency_of_use: faker.lorem.word(),
        quality_rating: faker.random.number({ min: 1, max: 5 }),
        value_rating: faker.random.number({ min: 1, max: 5 }),
        star_rating: faker.random.number({ min: 1, max: 5 }),
        helpful_yes: faker.random.number({ min: 1, max: 1000 }),
        helpful_no: faker.random.number({ min: 1, max: 500 }),
      };
      totalStarsForOneProduct += oneReview.star_rating;
      seedling.reviews.push(oneReview);
    }

    const unroundedAverageStar = totalStarsForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_star_rating = Math.round(unroundedAverageStar * 2) / 2;

    hugeSeedingArray.push(seedling);
  }
  database.save(hugeSeedingArray)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('database/seeding.js: Seeding complete! Bye bye 😙');
      database.db.close();
    });
}());
