const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'superadmin'],
        default: 'teacher'
    },
    profileImage: {
        type: String,
        default: '/img/default-profile.png'
    }
});

module.exports = mongoose.model('User', userSchema);