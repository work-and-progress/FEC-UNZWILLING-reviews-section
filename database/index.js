const dotenv = require('dotenv');
const { Pool } = require('pg');

const pool = new Pool({
  user: dotenv.DB_USER,
  host: dotenv.DB_HOST,
  password: dotenv.DB_PASS,
  database: 'reviews',
  port: 5432,
});

pool.query('SELECT NOW()')
  /* eslint-disable no-console */
  .then(() => console.log('Postgres connected. WAP!'))
  .catch((err) => console.log(err));

// Get review summary for one product
const fetchReviewSummary = (productId) => pool.query('SELECT * FROM product WHERE id = $1', [productId]);

// // Update the Review Summary - WIP need to pass reviewSummary object in query
const updateReviewSummary = (productId, reviewSummary) => {
  const reviewArr = Object.entries(reviewSummary);
  const paramsStr = reviewArr.map((kvPair) => `${kvPair[0]}=${kvPair[1]}`).join();

  const query = `UPDATE product SET ${paramsStr} WHERE id = $1`;
  const values = [productId];
  return pool.query(query, values);
};

// Get reviews for one product
const fetchReviews = (productId) => pool.query('SELECT * from review WHERE product_id = $1', [productId])
  .then((response) => response.rows);

// Add a review for a product
// 'id' auto-increments ('id' is defined as 'SERIAL' in schema)
// Note: ${keys} are not escaped
const addReview = (productId, review) => {
  const keys = [...Object.keys(review), 'product_id'];
  const values = [...Object.values(review), productId];
  const query = `INSERT INTO review(${keys}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
  return pool.query(query, values);
};

// // Delete reviewId by review ID
const deleteReview = (reviewId) => pool.query('DELETE FROM review WHERE id = $1', [reviewId]);

/*----------------------------------------------------*/
module.exports = {
  addReview,
  deleteReview,
  fetchReviews,
  fetchReviewSummary,
  updateReviewSummary,
};
