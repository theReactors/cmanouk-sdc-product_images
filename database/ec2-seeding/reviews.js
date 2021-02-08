const fs = require('fs');
const path = require('path');
const faker = require('faker');

const numberOfListings = 15;
const stream = fs.createWriteStream(path.join(__dirname, '/reviews.csv'));
stream.write('author,listing,body\n', 'utf-8');

const generateReview = () => {
  const author = Math.floor(Math.random() * 1500000);
  const listing = Math.floor(Math.random() * 8500000);
  const body = faker.lorem.sentences(2);
  return `${author},${listing},"${body}"`
}

const writeListings = (writer, encoding, callback) => {
  let count = numberOfListings;
  const write = () => {
    while(count > 0) {
      count--;
      const data = `${generateReview()}\n`;
      if (count === 0) writer.write(data, encoding, callback);
      if (count !== 0) writer.write(data, encoding);
    }
  }
  write();
};

writeListings(stream, 'utf-8', () => {
  stream.end();
});