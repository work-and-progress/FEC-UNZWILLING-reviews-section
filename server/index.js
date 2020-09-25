const express = require('express');
const database = require('../database/index.js');
const seed = require('../database/seeding.js');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Karin's app listening at http://localhost:${port}`)
});
/*----------------------------------------------*/
