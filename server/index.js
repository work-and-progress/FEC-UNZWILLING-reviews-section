const express = require('express');
const database = require('../database/index.js');

const app = express();
const port = 7777;


const path = require("path");
app.use(express.static(path.join(__dirname, "../client/dist")));

const cors = require('cors');
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

// get review by product id
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

// add a review by product_id
app.post('/review/:productId', (req, res) => {
  const { productId } = req.params;
  database.addReviewByProductId(productId)
    .then((result) => {
      if (!result) {
        res.status(400).send(`error adding review for Product ID: ${productId}`);
      } else {
        res.status(201);
      }
    });
});

// update a review by review_id
app.put('/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  database.updateReviewByReviewId(reviewId)
    .then((result) => {
      if (!result) {
        res.status(400).send(`error updaing review: ${reviewId}`);
      } else {
        res.status(201);
      }
    });
});

// add a review by review_id
app.delete('/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  database.deleteReviewByReviewId(reviewId)
    .then((result) => {
      if (!result) {
        res.status(400).send(`error deleting review: ${reviewId}`);
      } else {
        res.status(200);
      }
    });
});