const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');

const User = require('../models/User');
const UserService = require('../services/UserService');

router.get('/api/getUsers', async (req, res) => {
    let users = await User.find();
    res.json({users}).status(200);
});

router.get('/api/getUser/:userId', async (req, res) => {
    let user = await User.find({userId : req.params.userId});

    if (!user.length) {
        res.json('User not found').status(404);
    } else {
        res.json({user: user}).status(200);
    }
});

router.get('/api/getUser/:userName', async (req, res) => {
    let user = await User.find({userName : req.params.userName});

    if (!user.length) {
        res.json('User not found').status(404);
    } else {
        res.json({user: user}).status(200);
    }
});

router.post('/api/createUser', bodyParser.json(), (req, res) => {
    var data = new User();

    data.userName = req.body.username;
    data.reminders = []
    data.password = req.body.password;
    
    UserService.createUser(data, (created) => {
        if (!created) {
            res.json("El usuario no ha sido creado").status(400);
        } else {
            res.json("El usuario ha sido creado").status(200);
        }
    });

});

router.post('/api/login', bodyParser.json(), (req, res) => {
    var data = new User();

    data.userName = req.body.username;
    data.password = req.body.password;
    
    UserService.createUser(data, (created) => {
        if (!created) {
            res.json("El usuario no ha sido creado").status(400);
        } else {
            res.json("El usuario ha sido creado").status(200);
        }
    });

});

module.exports = router;