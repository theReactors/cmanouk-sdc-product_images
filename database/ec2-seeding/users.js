const fs = require('fs');
const path = require('path');
const faker = require('faker');

const numberOfListings = 15;
const stream = fs.createWriteStream(path.join(__dirname, '/users.csv'));
stream.write('username\n', 'utf-8');

const writeListings = (writer, encoding, callback) => {
  let count = numberOfListings;
  const write = () => {
    while(count > 0) {
      count--;
      const data = `${faker.internet.userName()}\n`;
      if (count === 0) writer.write(data, encoding, callback);
      if (count !== 0) writer.write(data, encoding);
    }
  }
  write();
};

writeListings(stream, 'utf-8', () => {
  stream.end();
});