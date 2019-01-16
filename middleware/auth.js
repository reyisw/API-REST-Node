'use strict';

const services = require('../services');

function isAuth(req, res, next) {
  if (!req.headers.auth) {
    return res.status(403).send({ message: 'No tienes acceso a este sitio' });
  }

  const token = req.headers.auth.split(' ')[1];

  services
    .decodeToken(token)
    .then(response => {
      req.user = response;
      next();
    })
    .catch(response => {
      res.status(response.status);
    });
}

module.exports = isAuth;
