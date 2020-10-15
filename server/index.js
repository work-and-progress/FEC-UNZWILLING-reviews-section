// New ordering per eslint // SDC - RIKU
const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('../database/index.js');

const app = express();
const port = 7777;

app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware to make req.body return JSON // SDC - RIKU
app.use(express.json());

app.use(cors());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Karin's app listening at http://localhost:${port}`);
});
/*----------------------------------------------*/

app.get('/reviews', (req, res) => {
  database.fetchReviews((err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

// READ review by product id
app.get('/review/:productId', (req, res) => {
  // eslint-disable-next-line no-console
  // console.log('Got your request! Query is ', req.params);
  const { productId } = req.params;
  database.fetchByProductId(productId)
    .then((product) => {
      if (!product) {
        res.status(400).send(`error finding product with Product ID: ${productId}`);
      } else {
        res.status(200).send(product);
      }
    });
});

// CREATE a review by product_id // SDC - RIKU
app.post('/review/:productId', (req, res) => {
  const { productId } = req.params;
  return database.addReviewByProductId(productId, req.body)
    .then((result) => res.status(201).send(result))
    .catch(() => res.status(400));
});

// UPDATE a review by review_id // SDC - RIKU
app.put('/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  return database.updateReviewByReviewId(reviewId)
    .then((result) => res.status(201).send(result))
    .catch(() => res.status(400));
});

// DELETE a review by review_id // SDC - RIKU
app.delete('/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  return database.deleteReviewByReviewId(reviewId)
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(404));
});
