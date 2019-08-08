const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    handle: {
        type: String,
        require: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        require: true,
    },
    skills: {
        type: [String],
        require: true
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                require: true
            },
            fieldofstudy: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        },
        data: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = Profile = mongoose.model("profile",ProfileSchema);