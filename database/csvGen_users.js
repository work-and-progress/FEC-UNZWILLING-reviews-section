/* eslint-disable */
const faker = require('faker');
const fs = require('fs');

const writeData = fs.createWriteStream('users_sql.csv');
writeData.write('id,username,email,location,total_reviews,total_questions,total_votes\n', 'utf8');

const totalProducts = 10000000;
const totalReviews = totalProducts * 10;
const totalUsers = totalReviews * 0.2;

function writeCSV(writer, encoding, callback) {
  let i = totalUsers;
  var count = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      count += 1;

      const id = i + 1;
      // const username = faker.commerce.product(); // SLOW
      // const email = faker.internet.email(); // SLOW
      const username = faker.name.firstName();
      const email = username + '@gmail.com';
      const location = faker.address.country().split(',')[0];
      const total_reviews = faker.random.number({ min: 1, max: 10 });
      const total_questions = faker.random.number({ min: 1, max: 10 });
      const total_votes = faker.random.number({ min: 1, max: 50 });

      let data = `${id},${username},${email},${location},${total_reviews},${total_questions},${total_votes}\n`;

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



