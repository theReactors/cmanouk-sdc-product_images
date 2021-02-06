const db = require('../index.js');

const getListing = (id) => {
  return pool
        .query(`SELECT * FROM listings WHERE id=${id};`)
        .then((res) => res)
        .catch((err) => err);
}

const getUsersListings = (id) => {
  return pool
        .query(`SELECT * FROM listings
                WHERE seller_id=${id};`)
        .then((res) => res)
        .catch((err) => err);
}

const addUser = (username) => {
  return pool
        .query(`INSERT INTO users(username)
                VALUES ('${username}');`)
        .then((res) => res)
        .catch((err) => err);
}

const addListing = ({ title, product_desc, price, rating, list_date, seller_id, image_urls }) => {
  const stringifiedUrls = (JSON.stringify(image_urls));
  const finalStr = stringifiedUrls.slice(1, stringifiedUrls.length - 1);
  console.log(finalStr);
  return pool
        .query(`INSERT INTO listings(title, product_desc, price, rating, list_date, seller_id, image_urls)
                VALUES ('${title}', '${product_desc}', ${price}, ${rating}, ${list_date}, ${seller_id},
                '{${finalStr}}');`)
        .then((res) => res)
        .catch((err) => err);
}

const getReviewsBodiesAndAuthorsByListing = (listing_id) => {
  return pool
        .query(`SELECT u.username, body
                FROM users u INNER JOIN reviews r
                ON u.id=r.author
                WHERE r.listing=${listing_id};`)
        .then((res) => res)
        .catch((err) => err);
}

module.exports = {
  getListing,
  getUsersListings,
  getReviewsBodiesAndAuthorsByListing,
  addUser,
  addListing
}