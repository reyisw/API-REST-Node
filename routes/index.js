'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');

const api = express.Router();
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');

api.use(bodyParser.urlencoded({ extended: false }));

api.use(bodyParser.json());

api.get('/product', ProductController.allProducts);

api.get('/product/:productId', ProductController.getProduct);

api.post('/product', ProductController.saveProduct);

api.put('/product/:productId', ProductController.updateProduct);

api.delete('/product/:productId', ProductController.deleteProduct);

api.post('/signUp', UserController.signUp);

api.post('/signIn', UserController.signIn);

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' });
});

module.exports = api;
