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
      most_helpful_favorable: 0,
      most_helpful_critical: 0,
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
    const arrayForMostFavorable = [];
    const arrayForMostCritical = [];
    for (let j = 0; j < randomNumberOfReviewsPerProduct; j += 1) {
      const oneReview = {
        review_id: j + 1,
        review_username: faker.internet.userName(),
        user_id: faker.random.number({ min: 10000, max: 90000 }),
        review_content: faker.lorem.paragraph(),
        review_title: faker.company.bsAdjective().toUpperCase(),
        review_recommended: faker.random.boolean(),
        quality_rating: faker.random.number({ min: 1, max: 5 }),
        value_rating: faker.random.number({ min: 1, max: 5 }),
        star_rating: faker.random.number({ min: 1, max: 5 }),
        helpful_yes: faker.random.number({ min: 1, max: 50 }),
        helpful_no: faker.random.number({ min: 1, max: 50 }),
        frequency_of_use: null,
        review_date: null,
      };
      /*--------------------------------*/
      // eslint-disable-next-line max-len
      if (oneReview.star_rating === 1 || oneReview.star_rating === 2 || oneReview.star_rating === 3) {
        arrayForMostCritical.push({
          starRating: oneReview.star_rating,
          helpfulScore: oneReview.helpful_yes,
          reviewID: oneReview.review_id,
        });
      } else {
        arrayForMostFavorable.push({
          starRating: oneReview.star_rating,
          helpfulScore: oneReview.helpful_yes,
          reviewID: oneReview.review_id,
        });
      }
      /*--------------------------------*/
      const randomNumberForFrequencyOfUse = faker.random.number({ min: 0, max: 5 });
      const frequencyOfUseOptions = ['Daily', 'A few times per week', 'Once per week', 'Monthly', 'A few times per year', 'Other'];
      for (let k = 0; k < frequencyOfUseOptions.length; k += 1) {
        oneReview.frequency_of_use = frequencyOfUseOptions[randomNumberForFrequencyOfUse];
      }
      /*--------------------------------*/
      const randomDate = faker.date.past();
      const dateNow = Date.now();
      const diff = new Date(dateNow - randomDate);
      oneReview.review_date = diff.getUTCMonth();
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
      /*--------------------------------*/
      // push one review into the array of reviews associated with one Product ID
      seedling.reviews.push(oneReview);
    } // END OF FOR LOOP
    /*--------------------------------*/
    // sort this the array by star rating and helpful score values in ascending
    // order prioritizing on the star rating value
    // https://stackoverflow.com/questions/4576714/sort-by-two-values-prioritizing-on-one-of-them
    // eslint-disable-next-line max-len
    arrayForMostFavorable.sort((a, b) => a.helpfulScore - b.helpfulScore || a.starRating - b.starRating);
    // eslint-disable-next-line max-len
    arrayForMostCritical.sort((a, b) => a.helpfulScore - b.helpfulScore || a.starRating - b.starRating);
    // honestly not sure how they sort it...

    const mostHelpfulFavorable = arrayForMostFavorable[arrayForMostFavorable.length - 1]
    || {
      reviewID: 0,
    };
    const mostHelpfulCritical = arrayForMostCritical[arrayForMostCritical.length - 1]
    || {
      reviewID: 0,
    };

    console.log('mostHelpfulFavorable: ', mostHelpfulFavorable);
    console.log('mostHelpfulCritical: ', mostHelpfulCritical);
    console.log('---------------')
    seedling.most_helpful_favorable = mostHelpfulFavorable.reviewID;
    seedling.most_helpful_critical = mostHelpfulCritical.reviewID;

    // console.log('most favorable ', arrayForMostFavorable);
    // eslint-disable-next-line max-len
    // console.log(' winner most favorable: ', arrayForMostFavorable[arrayForMostFavorable.length - 1])
    // console.log(' id of WINNER IS: ', mostHelpfulFavorable.reviewID || 0);
    // console.log('--------------------')
    // console.log('most critical ', arrayForMostCritical);
    // console.log(' winner most critical: ', arrayForMostCritical[arrayForMostCritical.length - 1])

    /*--------------------------------*/
    // total one star reviews
    seedling.aggregate_one_star_review = oneStarReview;
    // total two star reviews
    seedling.aggregate_two_star_review = twoStarReview;
    // total three star reviews
    seedling.aggregate_three_star_review = threeStarReview;
    // total four star reviews
    seedling.aggregate_four_star_review = fourStarReview;
    // total four star reviews
    seedling.aggregate_five_star_review = fiveStarReview;
    /*--------------------------------*/
    // Average Star rating
    const unroundedAverageStar = totalStarsForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_star_rating = Math.round(unroundedAverageStar * 2) / 2;

    // Average Quality rating
    const unroundedAverageQuality = totalQualityForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_quality_rating = Math.round(unroundedAverageQuality * 2) / 2;

    // Average Value rating
    const unroundedAverageValue = totalValueForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.aggregate_value_rating = Math.round(unroundedAverageValue * 2) / 2;
    /*--------------------------------*/
    // Total number of reviews
    seedling.total_number_reviews = randomNumberOfReviewsPerProduct;
    /*--------------------------------*/
    // push into huge array
    hugeSeedingArray.push(seedling);
  }
  database.save(hugeSeedingArray)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('database/seeding.js: Seeding complete! Bye bye 😙');
      database.db.close();
    });
}());
