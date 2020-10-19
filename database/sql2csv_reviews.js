/* eslint-disable */
const faker = require('faker');
const fs = require('fs');

const writeData = fs.createWriteStream('reviews_sql.csv');
writeData.write('id,title,content,date,recommended,quality_rating,value_rating,star_rating,helpful_yes,helpful_no,user_id,product_id\n', 'utf8');

const totalProducts = 10000000;
const totalReviews = totalProducts * 100;
const totalUsers = totalReviews * 0.5;

function writeCSV(writer, encoding, callback) {
  let i = totalReviews;
  let count = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      count += 1;

      const id = i + 1;
      // const user_name = faker.internet.userName();
      const title = faker.company.bsAdjective().toUpperCase();
      const content = faker.lorem.words().repeat(10);
      const date = faker.date.between('2015-01-01', '2020-10-10').toISOString().split("T")[0];
      const recommended = faker.random.boolean();
      const quality_rating = faker.random.number({ min: 1, max: 5 });
      const value_rating = faker.random.number({ min: 1, max: 5 });
      const star_rating = faker.random.number({ min: 1, max: 5 });
      const helpful_yes = faker.random.number({ min: 1, max: 50 });
      const helpful_no = faker.random.number({ min: 1, max: 50 });
      const user_id = faker.random.number({ min: 1, max: totalUsers });
      const product_id = faker.random.number({ min: 1, max: totalProducts });

      const data = `${id},${title},${content},${date},${recommended},${quality_rating},${value_rating},${star_rating},${helpful_yes},${helpful_no},${user_id},${product_id}\n`;

      if (!(count % 100000)) console.log(count);

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

function logTimeElapsed(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  console.log(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
}

const startTime = new Date();

writeCSV(writeData, 'utf-8', () => {
  writeData.end()
  const timeElapsed = new Date() - startTime;
  logTimeElapsed(timeElapsed);
});


