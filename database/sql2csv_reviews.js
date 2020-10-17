const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('reviews_sql.csv');
writeUsers.write('id,title,content,date,recommended,quality_rating,value_rating,star_rating,helpful_yes,helpful_no,user_id,product_id\n', 'utf8');

const totalProducts = 100;
const totalReviews = totalProducts * 100;
const totalUsers = totalReviews * 0.5;

function writeTenMillionUsers(writer, encoding, callback) {
  let i = totalReviews;

  function write() {
    let ok = true;

    do {
      i -= 1;

      // REVIEWS
      const id = i + 1;
      // const user_name = faker.internet.userName();
      const title = faker.company.bsAdjective().toUpperCase();
      const content = faker.lorem.paragraph();
      const date = faker.date.between('2015-01-01', '2020-10-10');
      const recommended = faker.random.boolean();
      const quality_rating = faker.random.number({ min: 1, max: 5 });
      const value_rating = faker.random.number({ min: 1, max: 5 });
      const star_rating = faker.random.number({ min: 1, max: 5 });
      const helpful_yes = faker.random.number({ min: 1, max: 50 });
      const helpful_no = faker.random.number({ min: 1, max: 50 });
      const user_id = faker.random.number({ min: 1, max: totalUsers });
      const product_id = faker.random.number({ min: 1, max: totalProducts });

      const data = `${id},${title},${content},${date},${recommended},${quality_rating},${value_rating},${star_rating},${helpful_yes},${helpful_no},${user_id},${product_id}\n`;

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
