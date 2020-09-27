const express = require('express');
const database = require('../database/index.js');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Karin's app listening at http://localhost:${port}`)
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
})

// get review by product id
app.get('/review', (req, res) => {
  console.log('Got your request! Query is ', req.query)
  var productId = req.query.product_id;
  database.fetchByProductId(productId)
    .then(product => {
      if(!product) {
        res.status(400).send(`error finding product with Product ID: ${productId}`);
      } else {
        res.status(200).send(product);
      }

    })
})
