const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const passport = require("passport");
//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//load User model
const User = require("../../models/User");

// @route   POST api/users/register
// @desc    register users
// @access  public
router.post("/register", async (req, res) => {
    //check validation
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) return res.status(404).json(errors);
    try {
        const {email, name, password} = req.body;
        let user = await User.findOne({email: email})
        if (user) {
            errors.email = "Email Already exists";
            res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(email, {
                s: "200", //size
                r: "pg", //rating
                d: "mm"  //default
            });
            const newUser = new User({name, email, password, avatar});
            await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    user = newUser.save();
                })
            })
        }
        await res.json(user)
    } catch (e) {
        console.log(e);
    }
});

// @route   POST api/users/login
// @desc    login users && return jwt
// @access  public
router.post("/login", async (req, res) => {
    //check validation
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) return res.status(404).json({errors});
    //find user by email
    const {email, password} = req.body;
    const user = await User.findOne({email}, {following: 0, followers: 0, data: 0});
    if (!user) {
        errors.email = "this email doesn't existe";
        return res.status(400).json({errors})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const payload = {id: user.id, name: user.name, avatar: user.avatar, handle: user.handle};
        //create jwt
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},
            (err, token) => res.json({
                success: true,
                token: "bearer " + token
            })
        );
    } else {
        errors.password = "this password incorrect";
        res.status(404).json({errors})
    }
});

// @route   POST api/users/follow/:id/:follow_id
// @desc    fllowing user to onther user
// @access  public
router.post("/follow/:id/:follow_id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const follow_user = await User.findById(req.params.follow_id);
            if (user.following.filter(follwo => follwo.user.toString() === follow_user.id).length > 0)
                return res.status(400).json({errors: {alreadyfollowed: 'you are already follow that user'}});
            follow_user.followers.unshift({user: user.id});
            follow_user.save();
            user.following.unshift({user: follow_user.id});
            user = await user.save();
            await res.json(user)
        } catch (err) {
            res.status(404).json({errors: {usernotfound: "No user Found"}})
        }
    });

// @route   POST api/users/unfollow/:id/:follow_id
// @desc    unfllowing user to onther user
// @access  public
router.post(
    "/unfollow/:id/:follow_id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const follow_user = await User.findById(req.params.follow_id)
            if (user.following.filter(follwo => follwo.user.toString() === follow_user.id).length === 0)
                return res.status(400).json({errors: {alreadyfollowed: 'you are already not follow that user'}});
            let followers = follow_user.followers.map(follwoer => follwoer.user.toString()).indexOf(user.id);
            follow_user.followers.splice(followers, 1);
            follow_user.save();
            let following = user.following.map(follwoer => follwoer.user.toString()).indexOf(follow_user.id);
            user.following.splice(following, 1);
            user = await user.save();
            await res.json(user)
        } catch (err) {
            res.status(404).json({errors: {usernotfound: "No user Found"}})
        }
    });

// @route   GET api/users/following/
// @desc    get all following
// @access  public
router.get(
    "/following/:id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id, {
                "name": 0, "email": 0, "password": 0,
                "avatar": 0, "data": 0, "followers": 0,
            });
            let ids = [...user.following.map(follow => follow.user)];
            user = await User.find({_id: {$in: ids}});
            await res.json(user)
        } catch (err) {
            res.status(404).json({errors: {usernotfound: "No user Found"}})
        }
    });

// @route   GET api/users/followers
// @desc    get all followers
// @access  public
router.get(
    "/followers/:id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let user = await User.findById(req.params.id)
            let ids = [...user.followers.map(follower => follower.user)];
            user = await User.find({_id: {$in: ids}})
            await res.json(user)
        } catch (err) {
            res.status(404).json({errors: {usernotfound: "No user Found"}})
        }
    });

// @route   POST api/users/current
// @desc    return current users
// @access  private
router.get("/current", passport.authenticate("jwt", {session: false}),
    async (req, res) =>
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            date: req.user.date,
        })
);
module.exports = router;