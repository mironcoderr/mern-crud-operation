const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    desig: String,
    number: Number,
    email: String,
    officeTime: String,
    offDay: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
