/* eslint-disable */
const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('products_sql.csv');
writeUsers.write('id,total_reviews,average_rating,average_quality_rating,average_value_rating,aggregate_one_star_review,aggregate_two_star_review,aggregate_three_star_review,aggregate_four_star_review,aggregate_five_star_review,most_helpful_favorable,most_helpful_critical\n', 'utf8');

const totalProducts = 10000000; // 10,000,000
const totalReviews = totalProducts * 100;
const totalUsers = totalReviews * 0.5;

function writeTenMillionUsers(writer, encoding, callback) {
  let i = totalProducts;

  function write() {
    let ok = true;

    do {
      i -= 1;

      // REVIEWS
      const id = i + 1;
      const total_reviews = faker.random.number({ min: 0, max: 200 });
      const average_rating = faker.random.number({ min: 1, max: 5 });
      const average_quality_rating = faker.random.number({ min: 1, max: 5 });
      const average_value_rating = faker.random.number({ min: 1, max: 5 });
      const aggregate_one_star_review = faker.random.number({ min: 1, max: 5 });
      const aggregate_two_star_review = faker.random.number({ min: 1, max: 5 });
      const aggregate_three_star_review = faker.random.number({ min: 1, max: 5 });
      const aggregate_four_star_review = faker.random.number({ min: 1, max: 5 });
      const aggregate_five_star_review = faker.random.number({ min: 1, max: 5 });
      const most_helpful_favorable = faker.random.number({ min: 1, max: 50 });
      const most_helpful_critical = faker.random.number({ min: 1, max: 50 });

      const data = `${id},${total_reviews},${average_rating},${average_quality_rating},${average_value_rating},${aggregate_one_star_review},${aggregate_two_star_review},${aggregate_three_star_review},${aggregate_four_star_review},${aggregate_five_star_review},${most_helpful_favorable},${most_helpful_critical}\n`;

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

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
