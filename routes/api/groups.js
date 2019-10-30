const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Group = require('../../models/Group');
const validateGroupInput = require("../../validation/group");

// @route   POST /api/groups/
// @desc    create group
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const {errors, isValid} = validateGroupInput(req.body);
        if (!isValid) return res.status(404).json({errors});
        //create new group
        const {description, name, interestedin} = req.body
        const newGroup = new Group({
            description, name,
            interestedin: interestedin.split(','),
            user: req.user.id,
        });
        let group = await newGroup.save()
        group.members.push({user: group.user});
        group.managers.push({user: group.user});
        group = await group.save();
        try {
            await res.json(group)
        } catch (e) {
            console.log(e);
        }
    });

// @route   GET /api/groups/
// @desc    get all groups
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let groups = await Group.find()
        try {
            await res.json(groups)
        } catch (e) {
            res.status(404).json({profile: 'There are no profiles'})
        }
    });

// @route   GET /api/groups/
// @desc    get my groups
// @access  private
router.get('/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let groups = await Group.find({
            $or: [
                {user: req.params.uid},
                {"members.user": req.params.uid}
            ]
        });
        try {
            await res.json(groups)
        } catch (e) {
            res.status(404).json({goodluck: 'You are not a user, join us'})
        }
    });

// @route   GET /api/groups/group/:id
// @desc    get group by id
// @access  private
router.get('/group/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        try {
            await res.json(group)
        } catch (e) {
            res.status(404).json({nogroup: 'thier is no group'})
        }
    });

// @route   GET /api/groups/:id/members
// @desc    get group members by id
// @access  private
router.get('/:id/members',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const group = await Group.find({_id: req.params.id})
            .populate('members.user', ['name', 'avatar', 'handle'])
            .populate('user', ['name', 'avatar'])
        try {
            await res.json(group)
        } catch (e) {
            res.status(404).json({nogroup: 'thier is no group'})
        }
    });

// @route   GET /api/groups/:id/managers
// @desc    get group manangers by id
// @access  private
router.get('/:id/managers',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.find({_id: req.params.id})
            .populate('managers.user', ['name', 'avatar', 'handle'])
            .populate('user', ['name', 'avatar'])
        try {
            await res.json(group[0])
        } catch (e) {
            res.status(404).json({nogroup: 'thier is no group'})
        }
    });


// @route   GET /api/groups/:id/requests
// @desc    get group requests by id
// @access  private
router.get('/:id/requests',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.find({_id: req.params.id})
            .populate('requests.user', ['name', 'avatar', 'handle'])
            .populate('user', ['name', 'avatar'])
        try {
            await res.json(group[0])
        } catch (e) {
            res.status(404).json({nogroup: 'thier is no group'})
        }
    });

// @route   DELETE /api/groups/:id
// @desc    delete group
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findOneAndDelete({_id: req.params.id})
        if (group) {
            await res.json(true)
        } else {
            res.status(404).json({nodelete: 'you can not delete that group'})
        }
    });

// @route   GET /api/groups/post/:id
// @desc    get all post of group
// @access  private
router.get('/post/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let posts = await Post.find({group: req.params.id})
        try {
            await res.json(posts)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/askjoin/:id/:uid
// @desc    send request to join a group
// @access  private
router.post('/askjoin/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group = group.requests.push({user: req.params.uid});
        group = group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/cancel/:id/:uid
// @desc    cancel request to join a group
// @access  private
router.post('/cancel/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group.requests = group.requests.filter(request => request.user != req.params.uid);
        group = group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/manager/:id/:uid
// @desc    create admin
// @access  private
router.post('/addmanager/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group.managers = [...group.managers, {user: req.params.uid}]
        group = await group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/manager/:id/:uid
// @desc    create admin
// @access  private
router.post('/delmanager/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group.managers = group.managers.filter(manager => manager.user != req.params.uid)
        group = group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/join/:id/:uid
// @desc    accept join request
// @access  private
router.post('/join/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group.requests = group.requests.filter(request => request.user != req.params.uid);
        group.members = [...group.members, {user: req.params.uid}];
        group = await group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/notjoin/:id/:uid
// @desc    reject join request
// @access  private
router.post('/notjoin/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id);
        group.requests = group.requests.filter(request => request.user != req.params.uid);
        group = await group.save();
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

// @route   GET /api/groups/reject/:id/:uid
// @desc    reject request to join a group
// @access  private
router.post('/removemember/:id/:uid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let group = await Group.findById(req.params.id)
        group.managers = group.managers.filter(manager => manager.user != req.params.uid)
        group.members = group.members.filter(member => member.user != req.params.uid)
        group = await group.save()
        try {
            await res.json(group)
        } catch (e) {
            await res.json(e)
        }
    });

module.exports = router;