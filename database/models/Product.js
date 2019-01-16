'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name required']
    },
    picture: {
      type: String
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'Product price required']
    },
    category: {
      type: String,
      enum: ['Computers', 'Phones', 'Accesories']
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
