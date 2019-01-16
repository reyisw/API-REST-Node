'use strict';

const Product = require('../database/models/Product');

function allProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` });
    if (!products) return res.status(404).send({ message: 'No hay productos' });

    res.status(200).send({ products });
  });
}

function deleteProduct(req, res) {
  const productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    product.remove(() => {
      if (err) res.status(500).send({ message: 'No se hado podido eliminar el producto' });
      res.status(200).send({ message: 'Producto eliminado' });
    });
  });
}

function getProduct(req, res) {
  const productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` });
    if (!product) return res.status(404).send({ message: 'No hay productos' });

    res.send(200, { product });
  });
}

function saveProduct(req, res) {
  const product = req.body;

  const newProduct = new Product(product);

  return newProduct.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'No se pudo guardar correctamente' });
    }
    res.status(200).send({ message: 'Producto guardado' });
  });
}

function updateProduct(req, res) {
  const productId = req.params.productId;
  const update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({ message: 'No se hado podido editar el producto' });
    res.status(200).send({ product: productUpdated });
  });
}

module.exports = {
  allProducts,
  deleteProduct,
  getProduct,
  saveProduct,
  updateProduct
};
