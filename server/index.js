const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const db = require('../database/helpers/queries.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/listing/:id', (req, res) => {
  const { id } = req.params;
  db.getListing(id)
    .then((result) => res.send(result.rows[0]))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => console.log(`App is up on ${PORT}`));