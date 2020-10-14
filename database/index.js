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

const fetchByProductId = (productID) => Review.findOne({ productId: productID });
// console.log('fetchByProductId invoked! Param is ', productID);
/*----------------------------------------------------*/
module.exports = {
  save,
  fetchReviews,
  fetchByProductId,
  db,
};

// // get review by product id
// app.get('/review/:productId', (req, res) => {
//   // eslint-disable-next-line no-console
//   // console.log('Got your request! Query is ', req.params);
//   const { productId } = req.params;
//   database.fetchByProductId(productId)
//     .then((product) => {
//       if (!product) {
//         res.status(400).send(`error finding product with Product ID: ${productId}`);
//       } else {
//         res.status(200).send(product);
//       }
//     });
// });

// // add a review by product_id
// app.post('/review/:productId', (req, res) => {
//   const { productId } = req.params;
//   database.addReviewByProductId(productId)
//     .then((result) => {
//       if (!result) {
//         res.status(400).send(`error adding review for Product ID: ${productId}`);
//       } else {
//         res.status(201);
//       }
//     });
// });

// // update a review by review_id
// app.put('/review/:reviewId', (req, res) => {
//   const { reviewId } = req.params;
//   database.updateReviewByReviewId(reviewId)
//     .then((result) => {
//       if (!result) {
//         res.status(400).send(`error updaing review: ${reviewId}`);
//       } else {
//         res.status(201);
//       }
//     });
// });

// // add a review by review_id
// app.delete('/review/:reviewId', (req, res) => {
//   const { reviewId } = req.params;
//   database.deleteReviewByReviewId(reviewId)
//     .then((result) => {
//       if (!result) {
//         res.status(400).send(`error deleting review: ${reviewId}`);
//       } else {
//         res.status(200);
//       }
//     });
// });