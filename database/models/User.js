'use strict';

const moongose = require('mongoose');

const Schema = moongose.Schema;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Email required']
    },
    name: {
      type: String,
      required: [true, 'User name required']
    },
    avatar: {
      type: String
    },
    password: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// eslint-disable-next-line func-names
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.methods.gravatar = () => {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto
    .createHash('md5')
    .update(this.email)
    .digest('hex');

  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

const User = moongose.model('User', userSchema);

module.exports = User;
