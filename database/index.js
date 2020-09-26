const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UNZWILLING', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
/*----------------------------------------------------*/
db.on('error',
  console.error.bind(console, 'database/index.js: MongoDB connection error:')
);
db.once('open', function() {
  console.log('database/index.js: Mongoose is connected to server!')
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
  // aggregate star rating

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
async function fetch(callback){
  console.log('fetch invoked')
  Review.find(null, null, {
    limit: 10

  }, (error, docs) => {
    if(error) {
      callback(error)
    } else {
      callback(null, docs);
    }
  })
}
/*----------------------------------------------------*/
module.exports = {
  save,
  fetch
}