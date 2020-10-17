/* eslint-disable */
const faker = require('faker');
const fs = require('fs');

const writeData = fs.createWriteStream('users_sql.csv');
writeData.write('id,username,email,location,total_reviews,total_questions,total_votes\n', 'utf8');

const totalProducts = 10000000;
const totalReviews = totalProducts * 100;
const totalUsers = totalReviews * 0.5;

function bulkWrite(writer, encoding, callback) {
  let i = totalUsers;

  function write() {
    let ok = true;

    do {
      i -= 1;

      // REVIEWS
      const id = i + 1;
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const location = `${faker.address.city()}"," ${faker.address.stateAbbr()}`;
      const total_reviews = faker.random.number({ min: 1, max: 10 });
      const total_questions = faker.random.number({ min: 1, max: 10 });
      const total_votes = faker.random.number({ min: 1, max: 50 });

      let data = `${id},${username},${email},${location},${total_reviews},${total_questions},${total_votes}\n`;

      if (!(i % 10000)) console.log(i);

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

bulkWrite(writeData, 'utf-8', () => {
  writeData.end();
});
