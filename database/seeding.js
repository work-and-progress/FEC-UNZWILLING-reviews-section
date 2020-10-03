/* eslint-disable max-len */
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
      productId: i,
      totalNumberReviews: 0,

      averageStarRating: 1,
      averageQualityRating: 1,
      averageValueRating: 1,

      aggregateOneStarReview: 1,
      aggregateTwoStarReview: 1,
      aggregateThreeStarReview: 1,
      aggregateFourStarReview: 1,
      aggregateFiveStarReview: 1,

      mostHelpfulFavorable: 0,
      mostHelpfulCritical: 0,
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
        reviewId: j + 1,
        reviewUsername: faker.internet.userName(),
        userId: faker.random.number({ min: 10000, max: 90000 }),
        reviewContent: faker.lorem.paragraph(),
        reviewTitle: faker.company.bsAdjective().toUpperCase(),
        reviewRecommended: faker.random.boolean(),
        qualityRating: faker.random.number({ min: 1, max: 5 }),
        valueRating: faker.random.number({ min: 1, max: 5 }),
        starRating: faker.random.number({ min: 1, max: 5 }),
        helpfulYes: faker.random.number({ min: 1, max: 50 }),
        helpfulNo: faker.random.number({ min: 1, max: 50 }),

        frequencyOfUse: null,
        reviewDate: null,
      };
      /*--------------------------------*/
      // eslint-disable-next-line max-len
      if (oneReview.starRating === 1 || oneReview.starRating === 2 || oneReview.starRating === 3) {
        arrayForMostCritical.push({
          starRating: oneReview.starRating,
          helpfulScore: oneReview.helpfulYes,
          reviewID: oneReview.reviewId,
        });
      } else {
        arrayForMostFavorable.push({
          starRating: oneReview.starRating,
          helpfulScore: oneReview.helpfulYes,
          reviewID: oneReview.reviewId,
        });
      }
      /*--------------------------------*/
      const randomNumberForFrequencyOfUse = faker.random.number({ min: 0, max: 5 });
      const frequencyOfUseOptions = ['Daily', 'A few times per week', 'Once per week', 'Monthly', 'A few times per year', 'Other'];
      for (let k = 0; k < frequencyOfUseOptions.length; k += 1) {
        oneReview.frequencyOfUse = frequencyOfUseOptions[randomNumberForFrequencyOfUse];
      }
      /*--------------------------------*/
      const randomDate = faker.date.past();
      const dateNow = Date.now();
      const diff = new Date(dateNow - randomDate);
      oneReview.reviewDate = diff.getUTCMonth();
      /*--------------------------------*/
      if (oneReview.starRating === 1) {
        oneStarReview += 1;
      } else if (oneReview.starRating === 2) {
        twoStarReview += 1;
      } else if (oneReview.starRating === 3) {
        threeStarReview += 1;
      } else if (oneReview.starRating === 4) {
        fourStarReview += 1;
      } else {
        fiveStarReview += 1;
      }
      /*--------------------------------*/
      totalStarsForOneProduct += oneReview.starRating;
      totalQualityForOneProduct += oneReview.qualityRating;
      totalValueForOneProduct += oneReview.valueRating;
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

    // console.log('mostHelpfulFavorable: ', mostHelpfulFavorable);
    // console.log('mostHelpfulCritical: ', mostHelpfulCritical);
    // console.log('---------------')
    seedling.mostHelpfulFavorable = mostHelpfulFavorable.reviewID;
    seedling.mostHelpfulCritical = mostHelpfulCritical.reviewID;

    // console.log('most favorable ', arrayForMostFavorable);
    // eslint-disable-next-line max-len
    // console.log(' winner most favorable: ', arrayForMostFavorable[arrayForMostFavorable.length - 1])
    // console.log(' id of WINNER IS: ', mostHelpfulFavorable.reviewID || 0);
    // console.log('--------------------')
    // console.log('most critical ', arrayForMostCritical);
    // console.log(' winner most critical: ', arrayForMostCritical[arrayForMostCritical.length - 1])

    /*--------------------------------*/
    // total one star reviews

    // MAKE THIS A PERCENTAGE
    const percentageForOneStar = Math.round((oneStarReview / randomNumberOfReviewsPerProduct) * 100);
    seedling.aggregateOneStarReview = percentageForOneStar;
    // total two star reviews
    const percentageForTwoStar = Math.round((twoStarReview / randomNumberOfReviewsPerProduct) * 100);
    seedling.aggregateTwoStarReview = percentageForTwoStar;
    // total three star reviews
    const percentageForThreeStar = Math.round((threeStarReview / randomNumberOfReviewsPerProduct) * 100);
    seedling.aggregateThreeStarReview = percentageForThreeStar;
    // total four star reviews
    const percentageForFourStar = Math.round((fourStarReview / randomNumberOfReviewsPerProduct) * 100);
    seedling.aggregateFourStarReview = percentageForFourStar;
    // total four star reviews
    const percentageForFiveStar = Math.round((fiveStarReview / randomNumberOfReviewsPerProduct) * 100);
    seedling.aggregateFiveStarReview = percentageForFiveStar;
    /*--------------------------------*/
    // Average Star rating
    const unroundedAverageStar = totalStarsForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.averageStarRating = Math.round(unroundedAverageStar * 10) / 10;

    // Average Quality rating
    const unroundedAverageQuality = totalQualityForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.averageQualityRating = Math.round(unroundedAverageQuality * 10) / 10;

    // Average Value rating
    const unroundedAverageValue = totalValueForOneProduct / randomNumberOfReviewsPerProduct;
    seedling.averageValueRating = Math.round(unroundedAverageValue * 10) / 10;
    /*--------------------------------*/
    // Total number of reviews
    seedling.totalNumberReviews = randomNumberOfReviewsPerProduct;
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
