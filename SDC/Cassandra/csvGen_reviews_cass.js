/* eslint-disable */
const faker = require('faker');
const fs = require('fs');

const writeData = fs.createWriteStream('reviews_cass.csv');
writeData.write('id,title,content,date,recommended,quality_rating,value_rating,star_rating,helpful_yes,helpful_no,user,product_id\n', 'utf8');

const totalProducts = 1000000;
const totalReviews = totalProducts * 10; // 10 million
const totalUsers = totalReviews * 0.2;

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
      const helpful_yes = faker.random.number({ min: 0, max: 50 });
      const helpful_no = faker.random.number({ min: 0, max: 50 });
      let product_id = faker.random.number({ min: 1, max: totalProducts });
      const user = {
        user_id: faker.random.uuid(),
        username: faker.name.firstName(),
        email: faker.internet.email(),
        location: faker.address.country().split(',')[0],
        total_reviews: faker.random.number({ min: 1, max: 10 }),
        total_questions: faker.random.number({ min: 1, max: 10 }),
        total_votes: faker.random.number({ min: 1, max: 50 }),
      }

      // assign 1% of reviews to first 1% of products
      if (i % 100 == 0) {
        product_id = faker.random.number({ min: 1, max: totalProducts/100 });
      }

      const data = `${id},${title},${content},${date},${recommended},${quality_rating},${value_rating},${star_rating},${helpful_yes},${helpful_no},${objToString(user)},${product_id}\n`;

      if (!(count % 100000)) console.log(count);

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// Why, oh why, doesn't JS toString work for objects?
function objToString (obj) {
  var str = '';
  for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        // add quotes if a string (and not the user_id UUID)
        if (typeof obj[p] === 'string' && p !== 'user_id') {
          str += p + ':' + "'" + obj[p] + "'";
        } else {
          str += p + ':' + obj[p];
        }
      }
      str += ',';
  }
  // strip last comma and wrap in curlies and qoutes
  str = str.substring(0, str.length-1);
  str = '"' + '{' + str + '}' + '"';
  return str;
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


