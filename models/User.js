const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('users', UserSchema)