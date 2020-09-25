const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UNZWILLING', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
/*----------------------------------------------------*/
db.on('error',
  console.error.bind(console, 'MongoDB connection error:')
);
db.once('open', function() {
  console.log('Mongoose is connected to server!')
});
/*----------------------------------------------------*/
let reviewSchema = mongoose.Schema({
  review_id: Number, // how to make this into an Id
  product_id: Number,
  review_content: String,
  review_title: String,
  user_id: Number,
  review_date: { type: Date, default: Date.now },
  quality_rating: Number,
  value_rating: Number,
  frequency_of_use: String,
  star_rating: Number,
  review_recommended: Boolean,
  helpful_yes: Number,
  helpful_no: Number,
  original_post_location: String
});

let Review = mongoose.model('Review', reviewSchema);
/*----------------------------------------------------*/
let save = (reviews) => {
  var savePromises = []; // empty array, and we will be pushing all the async actions into an array
  reviews.forEach(review => {
    let filter = {product_id: review.product_id};
    savePromises.push(
      Review.findOneAndUpdate(filter, review, {
        new: true,
        upsert: true
      })
      .catch(err => {
        console.error(err);
      })
    )
  })
  return Promise.all(savePromises);
}

// fetch 25 things
let fetch = () => {
  return Review.find().sort('_id').limit(25);
}
/*----------------------------------------------------*/
module.exports = {
  save,
  fetch,
  db
}