const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Group = require('../../models/Group');
const validateGroupInput = require("../../validation/group");

router.get('/test', (req, res) => res.json({msg: "group is works"}));


// @route   POST api/group/
// @desc    create group
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log(req.body);
        console.log(req.body);
        const {errors, isValid} = validateGroupInput(req.body);
        if (!isValid) {
            return res.status(404).json({errors})
        }
        const newGroup = new Group({
            description: req.body.description,
            name: req.body.name,
            interestedin: req.body.interestedin.split(','),
            user: req.user.id,
            members: [req.user._id],
            managers: [req.user._id],
        });
        newGroup.save().then(post => res.json(post))
    }
);

// @route   GET api/post/
// @desc    get all groups
// @access  private
router.get('/', (req, res) => {
    const errors = {};
    Group.find()
        .then(groups => {
            console.log(groups);
            if (!groups) {
                errors.nogroup = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(groups);
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});


module.exports = router;