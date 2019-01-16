'use strict';

const mongoose = require('mongoose');
const User = require('../database/models/User');
const service = require('../services');

function signIn(req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'No existe este usuario' });

    return user
      .comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` });
        if (!isMatch)
          return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` });

        req.user = user;
        res.status(200).send({
          message: 'Usuario Logeado',
          token: service.createToken(user)
        });
      })
      .select('_id email+password');
  });
}

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  return user.save(err => {
    if (err) res.status(500).send({ message: 'No se pudo registrar correctamente' });
    res.status(200).send({ token: service.createToken(user) });
  });
}

module.exports = {
  signIn,
  signUp
};
