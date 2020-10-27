require('newrelic');

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

// READ all reviews
app.get('/review-summary/:productId', (req, res) => {
  const { productId } = req.params;
  database.fetchReviewSummary(productId)
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(400));
});

// UPDATE a review by review_id // SDC - RIKU
app.put('/review-summary/:productId', (req, res) => {
  const productId = JSON.parse(req.params.productId);
  return database.updateReviewSummary(productId, req.body)
    .then((result) => res.status(201).send(result))
    .catch(() => res.status(400));
});

// READ review by product id
app.get('/review/:productId', (req, res) => {
  const { productId } = req.params;
  database.fetchReviews(productId)
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(400));
});

// CREATE a review by product_id // SDC - RIKU
app.post('/review/:productId', (req, res) => {
  const productId = JSON.parse(req.params.productId);
  return database.addReview(productId, req.body)
    .then((result) => res.status(201).send(result))
    .catch(() => res.status(400));
});

// DELETE a review by review_id // SDC - RIKU
app.delete('/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  return database.deleteReview(reviewId)
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(404));
});
