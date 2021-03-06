const db = require('../index.js');

const insertSingleRow = (urls) => {
  // insert arrays of varying length (listings !== same amt of imgs)
  return pool
          .query(`INSERT INTO listings(image_urls)
                  VALUES (ARRAY${JSON.stringify(urls).replace(/"/g, "'")})`)
          .then((res) => res)
          .catch((err) => err);
}

const getListing = (id) => {
  return pool
        .query(`SELECT * FROM listings WHERE id=${id};`)
        .then((res) => res)
        .catch((err) => err);
}

module.exports = {
  getListing
}