const { Schema, model } = require('mongoose');
var Mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(Mongoose);


const categorySchema = new Schema({
    categoryName: String,
    categoryColor: Number,
    categoryAuthor: Number
});

categorySchema.plugin(AutoIncrement, {inc_field: 'categoryId'})

module.exports = model('Category', categorySchema)