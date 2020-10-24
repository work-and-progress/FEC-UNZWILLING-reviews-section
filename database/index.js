const mongoose = require('mongoose');

// mongoose.connect('mongodb://database/UNZWILLING-reviews', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connect('mongodb://localhost/UNZWILLING-reviews', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

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
// childReview is an individual review for a product
const childReview = mongoose.Schema({
  reviewId: Number, // how to make this into an Id
  reviewUsername: String,
  reviewContent: String,
  reviewTitle: String,
  userId: Number,
  reviewDate: Number,
  qualityRating: Number,
  valueRating: Number,
  frequencyOfUse: String,
  starRating: Number,
  reviewRecommended: Boolean,
  helpfulYes: Number,
  helpfulNo: Number,
});

const reviewSchema = mongoose.Schema({
  productId: Number,
  totalNumberReviews: Number,

  averageStarRating: Number,
  averageQualityRating: Number,
  averageValueRating: Number,

  aggregateOneStarReview: Number,
  aggregateTwoStarReview: Number,
  aggregateThreeStarReview: Number,
  aggregateFourStarReview: Number,
  aggregateFiveStarReview: Number,

  mostHelpfulFavorable: Number, // id number of review
  mostHelpfulCritical: Number, // id number of review
  reviews: [childReview],
});

// 'Review' is a summary of review for a product
const Review = mongoose.model('Review', reviewSchema);
/*----------------------------------------------------*/
const save = (reviews) => {
  const savePromises = []; // empty array, we'll be pushing all the async actions into an array
  reviews.forEach((review) => {
    const filter = { productId: review.productId };
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

// Get ALL review - SDC - RIKU
const fetchReviews = () => Review.find({}).limit(10);

// Get one review
const fetchByProductId = (productID) => Review.findOne({ productId: productID });

// Add a 'childReview' - SDC - RIKU
const addReview = (productId, review) => {
  const insert = { $push: { reviews: review } };
  const options = { returnOriginal: false };
  return Review.findOneAndUpdate({ productId }, insert, options);
};

// Update the Review Summary - SDC - RIKU
const updateReviewSummary = (productId, reviewSummary) => {
  const options = { returnOriginal: false };
  return Review.findOneAndUpdate({ productId }, reviewSummary, options);
};

// Delete reviewId by productId - SDC Riku
const deleteReview = (productId, reviewId) => {
  const toDelete = { $pull: { reviews: { reviewId } } };
  return Review.findOneAndUpdate({ productId }, toDelete);
};

/*----------------------------------------------------*/
module.exports = {
  save,
  fetchReviews,
  fetchByProductId,
  addReview,
  updateReviewSummary,
  deleteReview,
  db,
};
