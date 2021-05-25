const { Schema, model } = require('mongoose');
var Mongoose = require('mongoose');

var AutoIncrement = require('mongoose-sequence')(Mongoose);

const reminderSchema = new Schema({
    reminderTitle: String,
    reminderDesc: String,
    reminderDate: {type: Date, min: Date.now},
    reminderAuthor: Number,
    category: Number,
    completed: Boolean
});

reminderSchema.plugin(AutoIncrement, {inc_field: 'reminderId'})
module.exports = model('Reminder', reminderSchema)