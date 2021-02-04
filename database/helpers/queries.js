const db = require('../index.js');

const queryRowsById = (id) => {
  return pool
          .query(`SELECT * FROM listings WHERE id=${id}`)
          .then((res) => res.rows)
          .catch((err) => err);
}

const insertSingleRow = (urls) => {
  // insert arrays of varying length (listings !== same amt of imgs)
  return pool
          .query(`INSERT INTO listings(image_urls)
                  VALUES (ARRAY${JSON.stringify(urls).replace(/"/g, "'")})`)
          .then((res) => res)
          .catch((err) => err);
}

// queryRowsById(2).then((res) => console.log(res)).catch((err) => console.error(err))
// insertSingleRow(['example@example.com', 'url@url.com', 'cmanouk@cmanouk.com']).then((res) => console.log(res)).catch((err) => err);