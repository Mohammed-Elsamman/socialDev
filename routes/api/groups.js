const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Group = require('../../models/Group');
const validateGroupInput = require("../../validation/group");

router.get('/test', (req, res) => res.json({msg: "group is works"}));


// @route   POST /api/groups/
// @desc    create group
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateGroupInput(req.body);
        if (!isValid) {
            return res.status(404).json({errors})
        }
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

// @route   GET /api/groups/
// @desc    get all groups
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.find()
            .then(groups => res.json(groups))
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });

// @route   GET /api/groups/
// @desc    get my groups
// @access  private
router.get('/:uid',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.find({
            $or: [
                {
                    user: req.params.id
                },
                {
                    "members.user": req.params.id
                }
            ]
        })
            .then(groups => res.json(groups))
            .catch(err => res.status(404).json({goodluck: 'You are not a user, join us'}));
    });


// @route   GET /api/groups/group/:id
// @desc    get group by id
// @access  private
router.get('/group/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.findById(req.params.id)
            .then(group => res.json(group))
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });


// @route   GET /api/groups/:id/members
// @desc    get group by id
// @access  private
router.get('/:id/members',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.find({_id:req.params.id})
            .populate('members.user', ['name', 'avatar','handle'])
            .populate('user', ['name', 'avatar'])
            .then(group => {
                console.log(group[0].members);
                return res.json(group[0])
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });

// @route   GET /api/groups/:id/managers
// @desc    get group by id
// @access  private
router.get('/:id/managers',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.find({_id:req.params.id})
            .populate('managers.user', ['name', 'avatar','handle'])
            .populate('user', ['name', 'avatar'])
            .then(group => {
                console.log(group[0].members);
                return res.json(group[0])
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });


// @route   GET /api/groups/:id/requests
// @desc    get group by id
// @access  private
router.get('/:id/requests',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.find({_id:req.params.id})
            .populate('requests.user', ['name', 'avatar','handle'])
            .populate('user', ['name', 'avatar'])
            .then(group => {
                console.log(group[0].requests);
                return res.json(group[0])
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });


// @route   DELETE /api/groups/:id
// @desc    delete group
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.findOneAndDelete({_id: req.params.id})
            .then(group => {
                res.json(true);
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
    });


// @route   GET /api/groups/post/:id
// @desc    get all post of group
// @access  private
router.get('/post/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.find({group: req.params.id})
            .then(post => {
                res.json(post)
            }).catch(err => err)
    }
)


// @route   GET /api/groups/askjoin/:id/:uid
// @desc    send request to join a group
// @access  private
router.post('/askjoin/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.findById(req.params.id)
            .then(group => {
                console.log(group);
                group.requests.push({user: req.params.uid})
                return group.save(group => res.json(group))
            }).catch(err => err)
    }
)


// @route   GET /api/groups/cancel/:id/:uid
// @desc    cancel request to join a group
// @access  private
router.post('/cancel/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Group.findById(req.params.id)
            .then(group => {
                group.requests = group.requests.filter(request => request.user != req.params.uid)
                return group.save(group => res.json(group))
            }).catch(err => err)
    }
)

module.exports = router;