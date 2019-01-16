'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(
  config.db,
  (err, res) => {
    if (err) {
      console.log(`Error al conectarse a la DB: ${err}`);
    }
    console.log('Connected to MongoDB 🕺');
  }
);

app.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port} 🚀`);
});
