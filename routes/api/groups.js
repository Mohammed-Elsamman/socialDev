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
        const {errors, isValid} = validateGroupInput(req.body);
        if (!isValid) {
            return res.status(404).json({errors})
        }
        console.log(typeof req.user.id);
        const newGroup = new Group({
            description: req.body.description,
            name: req.body.name,
            interestedin: req.body.interestedin.split(','),
            user: req.user.id,
        });
        newGroup.save().then(group => {
            group.members.push({user: group.user});
            group.managers.push({user: group.user});
            return group
        }).then(group => group.save())
            .then(group => res.json(group))
    }
);

// @route   GET api/group/
// @desc    get all groups
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    const errors = {};

    Group.find()
        .then(groups => {
            if (!groups) {
                errors.nogroup = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(groups);
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});

// @route   GET api/group/
// @desc    get my groups
// @access  private
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        Group.find({
            $or: [
                {
                    user: req.params.id
                },
                {
                    "members.user": {$eq: req.params.id}
                }
            ]
        })
            .then(groups => {
                if (!groups) {
                    errors.nogroup = 'There are no groups';
                    return res.status(404).json(errors);
                }
                res.json(groups);
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });


// @route   GET api/group/:id
// @desc    get all groups
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log(11111111111111111111111111111111111);
        Group.findOneAndDelete({_id:req.params.id})
        .then(group => {
            res.json(true);
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});



module.exports = router;