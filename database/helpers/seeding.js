const faker = require('faker');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const usersCsvWriter = createCsvWriter({
  path: path.join(__dirname, '../data/users.csv'),
  header: [
    { id: 'username', title: 'username' }
  ]
})

const listingsCsvWriter = createCsvWriter({
  path: path.join(__dirname, '../data/listings.csv'),
  header: [
    { id: 'title', title: 'title' },
    { id: 'product_desc', title: 'product_desc' },
    { id: 'price', title: 'price' },
    { id: 'rating', title: 'rating' },
    { id: 'list_date', title: 'list_date' },
    { id: 'seller_id', title: 'seller_id'},
    { id: 'image_urls', title: 'image_urls' },
  ]
})

const reviewsCsvWriter = createCsvWriter({
  path: path.join(__dirname, '../data/reviews.csv'),
  header: [
    { id: 'author', title: 'author' },
    { id: 'listing', title: 'listing' },
    { id: 'body', title: 'body' }
  ]
})

const writingUsers = () => {
  const userRecords = [];
  for (let i = 0; i < 500000; i++) {
    const username = faker.internet.userName();
    if (userRecords[username]) continue;
    userRecords.push({ username });
  }
  usersCsvWriter.writeRecords(userRecords)
    .then((res) => console.log('Done...'))
    .catch((err) => console.error(err));
}

const writingListings = () => {
  const listingsRecords = [];
  const randomEpoch = () => Math.floor(Math.random() * (1612456227 - 1609518628)) + 1609518628;
  const randomUrls = () => {
    const urls = [];
    const imgCount = Math.floor(Math.random() * (7 - 2)) + 3
    for (let i = 0; i < imgCount; i++) { urls.push(faker.image.image(320, 240, true)) };
    return `{${urls.slice(1, urls.length - 1)}}`;
  };
  for (let i = 0; i < 500000; i++) {
    const title = faker.commerce.productName();
    const product_desc = faker.commerce.productDescription();
    const list_date = randomEpoch();
    const price = faker.finance.amount(9, 199, 2);
    const rating = Math.round((Math.random() * 3 + 2) * 100) / 100;
    const seller_id = Math.floor(Math.random() * 1500000);
    const image_urls = randomUrls();
    listingsRecords.push({ title, product_desc, price, rating, list_date, seller_id, image_urls });
  }
  listingsCsvWriter.writeRecords(listingsRecords)
    .then((res) => console.log('Done...'))
    .catch((err) => console.error(err));
}

const writingReviews = () => {
  const reviewsRecords = [];
  for (let i = 0; i < 1000000; i++) {
    const author = Math.floor(Math.random() * 1500000);
    const listing = Math.floor(Math.random() * 8500000);
    const body = faker.lorem.sentences(2);
    reviewsRecords.push({ author, listing, body })
  }
  reviewsCsvWriter.writeRecords(reviewsRecords)
    .then((res) => console.log('Done...'))
    .catch((err) => console.error(err));
}

writingUsers();
writingListings();
writingReviews();