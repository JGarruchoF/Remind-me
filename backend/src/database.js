const mongoose = require('mongoose');

async function connect() {

    await mongoose.connect('mongodb://localhost/remind-me-db',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('[Database] Connected');

};

module.exports = { connect };