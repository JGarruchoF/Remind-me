const Reminder = require('../models/Reminder')

const createReminder = (reminderData, callback) => {
    console.log(reminderData)

    var data = new Reminder();
    data.reminderTitle = reminderData.reminderTitle;
    data.reminderDesc = reminderData.reminderDesc;
    data.reminderAuthor = reminderData.reminderAuthor;
    data.reminderDate = reminderData.reminderDate;
    data.completed = reminderData.completed;
    data.category = reminderData.category;
    data.save(function(err, doc) {
        callback(true);
    })

}


exports.createReminder = createReminder;