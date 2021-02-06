require('newrelic');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('../database/helpers/queries.js');
const cache = require('./middleware/cache.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(compression());

app.get('/listing/:id', cache.get, (req, res, next) => {
  const { id } = req.params;
  db.getListing(id)
    .then((result) => {
      cache.set(req, result.rows[0])
      res.send(result.rows[0])
    })
    .catch((err) => res.status(400).send(err));
});

app.get('/:userId/listings', (req, res) => {
  const { userId } = req.params;
  db.getUsersListings(userId)
    .then((result) => res.send(result.rows))
    .catch((err) => res.status(400).send(err));
});

app.get('/reviews/:listingId', cache.get, (req, res) => {
  const { listingId } = req.params;
  db.getReviewsBodiesAndAuthorsByListing(listingId)
    .then((result) => {
      cache.set(req, result.rows)
      res.send(result.rows)
    })
    .catch((err) => res.status(400).send(err));
});

app.post('/create/user', (req, res) => {
  const { username } = req.body;
  db.addUser(username)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.post('/create/listing', (req, res) => {
  const { listing_info } = req.body;
  db.addListing(listing_info)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => console.log(`App is up on ${PORT}`));