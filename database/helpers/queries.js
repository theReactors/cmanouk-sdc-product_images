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

// ADD ARRAY INFORMATION???
const addListing = ({ title, product_desc, price, rating, list_date, seller_id, image_urls }) => {
  const stringifiedUrls = (JSON.stringify(image_urls));
  const finalStr = stringifiedUrls.slice(1, stringifiedUrls.length - 1);
  console.log(finalStr);
  return pool
        .query(`INSERT INTO listings(title, product_desc, price, rating, list_date, seller_id, image_urls)
                VALUES ('${title}', '${product_desc}', '${price}', '${rating}', '${list_date}', '${seller_id}',
                '{${finalStr}}');`)
        .then((res) => res)
        .catch((err) => err);
}

// return usernames and body of review from all reviews of a listing, given some id
// return all reviews written by one author(ie. user)

module.exports = {
  getListing,
  getUsersListings,
  addUser,
  addListing
}