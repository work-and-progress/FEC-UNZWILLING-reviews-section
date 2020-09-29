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
      total_number_reviews: null,
      aggregate_star_rating: null,
      aggregate_quality_rating: null,
      aggregate_value_rating: null,
      aggregate_one_star_review: null,
      aggregate_two_star_review: null,
      aggregate_three_star_review: null,
      aggregate_four_star_review: null,
      aggregate_five_star_review: null,
      reviews: [],
    };
    let totalStarsForOneProduct = 0;
    let totalQualityForOneProduct = 0;
    let totalValueForOneProduct = 0;
    let oneStarReview = 0;
    let twoStarReview = 0;
    let threeStarReview = 0;
    let fourStarReview = 0;
    let fiveStarReview = 0;
    /*--------------------------------*/
    const randomNumberOfReviewsPerProduct = faker.random.number({ min: 1, max: 25 });
    for (let j = 0; j < randomNumberOfReviewsPerProduct; j += 1) {
      const oneReview = {
        review_id: j + 1,
        review_username: faker.internet.userName(),
        user_id: faker.random.number({ min: 10000, max: 90000 }),
        review_content: faker.lorem.paragraph(),
        review_title: faker.lorem.sentence(),
        review_date: faker.date.recent(),
        review_recommended: faker.random.boolean(),
        frequency_of_use: faker.lorem.word(),
        quality_rating: faker.random.number({ min: 1, max: 5 }),
        value_rating: faker.random.number({ min: 1, max: 5 }),
        star_rating: faker.random.number({ min: 1, max: 5 }),
        helpful_yes: faker.random.number({ min: 1, max: 1000 }),
        helpful_no: faker.random.number({ min: 1, max: 500 }),
      };
      /*--------------------------------*/
      if (oneReview.star_rating === 1) {
        oneStarReview += 1;
      } else if (oneReview.star_rating === 2) {
        twoStarReview += 1;
      } else if (oneReview.star_rating === 3) {
        threeStarReview += 1;
      } else if (oneReview.star_rating === 4) {
        fourStarReview += 1;
      } else {
        fiveStarReview += 1;
      }
      /*--------------------------------*/
      totalStarsForOneProduct += oneReview.star_rating;
      totalQualityForOneProduct += oneReview.quality_rating;
      totalValueForOneProduct += oneReview.value_rating;

      seedling.reviews.push(oneReview);
    }
    /*--------------------------------*/
    seedling.aggregate_one_star_review = oneStarReview;
    seedling.aggregate_two_star_review = twoStarReview;
    seedling.aggregate_three_star_review = threeStarReview;
    seedling.aggregate_four_star_review = fourStarReview;
    seedling.aggregate_five_star_review = fiveStarReview;

    const unroundedAverageStar = totalStarsForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_star_rating = Math.round(unroundedAverageStar * 2) / 2;

    const unroundedAverageQuality = totalQualityForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_quality_rating = Math.round(unroundedAverageQuality * 2) / 2;

    const unroundedAverageValue = totalValueForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_value_rating = Math.round(unroundedAverageValue * 2) / 2;

    seedling.total_number_reviews = randomNumberOfReviewsPerProduct;

    hugeSeedingArray.push(seedling);
  }
  database.save(hugeSeedingArray)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('database/seeding.js: Seeding complete! Bye bye 😙');
      database.db.close();
    });
}());
