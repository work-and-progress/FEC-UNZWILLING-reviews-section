const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/UNZWILLING', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
/*----------------------------------------------------*/
db.on('error',
  // eslint-disable-next-line no-console
  console.error.bind(console, 'database/index.js: MongoDB connection error'));

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('database/index.js: Mongoose is connected to server!');
});
/*----------------------------------------------------*/
const childReview = mongoose.Schema({
  review_id: Number, // how to make this into an Id
  review_username: String,
  review_content: String,
  review_title: String,
  user_id: Number,
  review_date: Number,
  quality_rating: Number,
  value_rating: Number,
  frequency_of_use: String,
  star_rating: Number,
  review_recommended: Boolean,
  helpful_yes: Number,
  helpful_no: Number,
});

const reviewSchema = mongoose.Schema({
  product_id: Number,
  total_number_reviews: Number,
  aggregate_star_rating: Number,
  aggregate_quality_rating: Number,
  aggregate_value_rating: Number,
  aggregate_one_star_review: Number,
  aggregate_two_star_review: Number,
  aggregate_three_star_review: Number,
  aggregate_four_star_review: Number,
  aggregate_five_star_review: Number,
  most_helpful_favorable: Number, // id number of review
  most_helpful_critical: Number, // id number of review
  reviews: [childReview],
});

const Review = mongoose.model('Review', reviewSchema);
/*----------------------------------------------------*/
const save = (reviews) => {
  const savePromises = []; // empty array, we'll be pushing all the async actions into an array
  reviews.forEach((review) => {
    const filter = { product_id: review.product_id };
    savePromises.push(
      Review.findOneAndUpdate(filter, review, {
        new: true,
        upsert: true,
      })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        }),
    );
  });
  return Promise.all(savePromises);
};

const fetchReviews = (callback) => {
  // console.log('fetchReviews invoked! Serving you 10 reviews 😀');
  Review.find(null, null, {
    limit: 10,

  }, (error, docs) => {
    if (error) {
      callback(error);
    } else {
      callback(null, docs);
    }
  });
};

const fetchByProductId = (productID) => Review.findOne({ product_id: productID });
// console.log('fetchByProductId invoked! Param is ', productID);

/*----------------------------------------------------*/
module.exports = {
  save,
  fetchReviews,
  fetchByProductId,
  db,
};
