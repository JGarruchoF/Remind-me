const UserRepository = require('../repository/UserRepository')
const User = require('../models/User');

const createUser = (userData, callback) => {
    UserRepository.getUser(userData, (res) => {

        if (!res) {
            var data = new User();
            data.userName = userData.userName;
            data.reminders = []
            data.setPassword(userData.password);

            data.save(function(err, doc) {
                callback(true);
            })
        } else {
            callback(false);
        }
    })
}

exports.createUser = createUser;