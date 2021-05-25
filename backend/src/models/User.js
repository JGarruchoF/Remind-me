const { Schema, model} = require('mongoose');
var Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
var AutoIncrement = require('mongoose-sequence')(Mongoose);

const userSchema = new Schema({
    userName: String,
    hash: String,
    salt: String
});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'})

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
}

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };

module.exports = model('User', userSchema)