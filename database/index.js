const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UNZWILLING', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const faker = require('faker');


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

/*----------------------------------------------------*/

// var randomID = faker.unique();
// console.log(randomID)

/*----------------------------------------------------*/
// db.reviews.find().pretty() to view data
// db.reviews.deleteMany({}) to drop all data
// db.dropDatabase(); to drop database
// test is working, https://mongoosejs.com/docs/models.html


const test = new Review ({
  review_id: faker.random.number({
    'min': 10000,
    'max': 90000
  }),

  product_id: faker.random.number({
    'min': 1000,
    'max': 1099
  }),
  user_id: faker.random.number({
    'min': 10000,
    'max': 90000
  }),


  review_content: faker.lorem.paragraph(),
  review_title: faker.lorem.sentence(),
  review_date: faker.date.recent(),
  review_recommended: faker.random.boolean(),
  original_post_location: faker.lorem.words(),

  frequency_of_use: faker.lorem.word(),

  quality_rating: faker.random.number({
    'min': 1,
    'max': 5
  }),
  value_rating: faker.random.number({
    'min': 1,
    'max': 5
  }),
  star_rating: faker.random.number({
    'min': 1,
    'max': 5
  }),

  helpful_yes: faker.random.number({
    'min': 1,
    'max': 5
  }),
  helpful_no: faker.random.number({
    'min': 1,
    'max': 5
  })
});


test.save(function(err) {
  if (err) {
    console.log(err);
  }
});