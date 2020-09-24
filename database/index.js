const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UNZWILLING', { useNewUrlParser: true, useUnifiedTopology: true });

const dummy = require('mongoose-dummy'); // added

const db = mongoose.connection;

db.on('error',
  console.error.bind(console, 'MongoDB connection error:')
);
db.once('open', function() {
  console.log("Mongoose is connected to server!")
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

let save = (reviews) => {
  var savePromises = []; // empty array, and we will be pushing all the async actions into an array

  reviews.forEach(review => {
    let filter = {review_id: review.id};

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

let fetch = () => {
  return Review.find().sort('review_id').limit(25);
}

let randomObj = dummy(Review, {}) // this works, but it's not saving to the DB at all

console.log(randomObj);

/*----------------------------------------------------*/
// db.reviews.find().pretty() to view data
// db.reviews.deleteMany({}) to drop all data
// db.dropDatabase(); to drop database
// test is working, https://mongoosejs.com/docs/models.html


// const test = new Review ({
//   review_id: 1,
//   product_id: 1,
//   review_content: 'hello',
//   review_title: 'i hate my wife',
//   user_id: 1,
//   review_date: '2002-12-09',
//   quality_rating: 2,
//   value_rating: 2,
//   frequency_of_use: 'none',
//   star_rating: 1,
//   review_recommended: true,
//   helpful_yes: 2,
//   helpful_no: 2,
//   original_post_location: 'nowhere'
// });


// test.save(function(err) {
//   if (err) {
//     return handleError(err);
//   }
// });
