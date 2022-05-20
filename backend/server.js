const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user.js');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mernmongo:merncrud123@cluster0.ga7ye.mongodb.net/merncrud?retryWrites=true&w=majority', console.log('DB Connected'));

app.post('/user', (req, res)=> {
    const user = {
        name: req.body.name,
        desig: req.body.desig,
        number: req.body.number,
        email: req.body.email,
        officeTime: req.body.officeTime,
        offDay: req.body.offDay,
    }

    const users = new User(user);
    users.save();
});

app.get('/user', async function(req, res) {
    const data = await User.find({});
    res.send(data);
});

app.delete('/user/:userid', function(req, res) {
    User.findByIdAndDelete(req.params.userid, (err, docs)=> {
        console.log(err);
    });
});

app.get('/user/:userid', async function(req, res) {
    const data = await User.findById(req.params.userid);
    res.send(data);
});

app.put('/user/:userid', function(req, res) {
    const user = {
        name: req.body.name,
        desig: req.body.desig,
        number: req.body.number,
        email: req.body.email,
        officeTime: req.body.officeTime,
        offDay: req.body.offDay,
    }

    User.findByIdAndUpdate(req.params.userid, user, (err, docs) => {
        console.log(err);
    });
});

app.listen('8000', ()=> console.log('Server Running...'));