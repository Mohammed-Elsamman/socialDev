const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Post Schema
const groupSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        require: true
    },
    Managers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    resquests: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    members: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    description: {
        type: String,
        require: true
    },
    interestedin: {
        type: [String],
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model("group", groupSchema);