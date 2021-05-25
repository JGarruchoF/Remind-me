const User = require('../models/User');

const getUser = (userData, callback) => {
    var res = false;
    User.exists({userName: userData.userName}, function (err, doc) {
        if (doc) {
            res = true;
        }
        callback(res);
    })
}

exports.getUser = getUser;