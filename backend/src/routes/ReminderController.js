const { Router, query } = require('express');
const { Mongoose } = require('mongoose');
const router = Router();
const bodyParser = require('body-parser');

const Reminder = require('../models/Reminder');
const ReminderService = require('../services/ReminderService');

router.get('/api/getReminders/:userId', async (req, res) => {
    let reminderQuery = await Reminder.find({ reminderAuthor: req.params.userId }).exec();
    if (!reminderQuery.length) {
        res.json('Reminder not found').status(404);
    } else {
        res.json({ reminders: reminderQuery }).status(200);
    }
});


router.post('/api/createReminder', bodyParser.json(), async (req, res) => {

    var data = new Reminder();

    data.reminderTitle = req.body.reminderTitle;
    data.reminderDesc = req.body.reminderDesc;
    data.reminderAuthor = req.body.reminderAuthor;
    data.reminderDate = req.body.reminderDate;
    data.category = req.body.category;
    data.completed = req.body.completed;

    ReminderService.createReminder(data, (created) => {
        if (!created) {
            res.json("El recordatorio no ha sido creado").status(400);
        } else {
            res.json("El recordatorio ha sido creado").status(200);
        }
    });

})

router.patch('/api/modifyReminder/:reminderId', bodyParser.json(), async (req, res) => {

    let reminderQuery = { reminderId: req.params.reminderId }

    Reminder.findOneAndUpdate(reminderQuery, req.body, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Modificado correctamente.');
    });

})

router.delete('/api/removeReminder/:reminderId', async (req, res) => {

    let reminderQuery = { reminderId: req.params.reminderId }

    Reminder.findOneAndDelete(reminderQuery, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Borrado correctamente.');
    });

})

module.exports = router;