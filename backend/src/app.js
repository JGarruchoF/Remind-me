const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(require('./routes/UserController'));
app.use(require('./routes/ReminderController'));
app.use(require('./routes/CategoryController'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;