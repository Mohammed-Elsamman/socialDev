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

const User = require("../../models/User");
router.get('/test', (req, res) => res.json({msg: "user is works"}));

// @route   POST api/users/register
// @desc    register users
// @access  public
router.post(
    "/register",
    (req, res) => {

        const {errors, isValid} = validateRegisterInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(404).json({errors})
        }
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    errors.email = "Email Already exists"
                    return res.status(400).json(errors)
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: "200", //size
                        r: "pg", //rating
                        d: "mm"  //default
                    });
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        avatar
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    });

// @route   POST api/users/login
// @desc    login users && return jwt
// @access  public
router.post("/login", (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(404).json({errors})
    }

    const email = req.body.email;
    const password = req.body.password;
    //find user by email
    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = "this email doesn't existe";
                return res.status(400).json({errors})
            }
            //compare password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {id: user.id, name: user.name, avatar: user.avatar};
                    //create jwt
                    jwt.sign(payload, keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "bearer " + token
                            })
                        });
                } else {
                    errors.password = "this password incorrect";
                    res.status(404).json({errors})
                }
            })
        })
});

// @route   POST api/users/follow/:id/:follow_id
// @desc    fllowing user to onther user
// @access  public
router.post(
    "/follow/:id/:follow_id",
    (req, res) => {
        passport.authenticate('jwt', {session: false}),
            User.findById(req.params.id)
                .then(user => {
                    if (!user) {
                        return res.status(400).json({errors: {nouser: "your are not a user"}})
                    } else {
                        User.findById(req.params.follow_id)
                            .then(follow_user => {
                                if (!follow_user) {
                                    return res.status(400).json({errors: {nouser: "your are not a user"}})
                                } else {
                                    if (user.following.filter(follwo => follwo.user.toString() === follow_user.id).length > 0) {
                                        return res.status(400).json({errors: {alreadyfollowed: 'you are already follow that user'}});
                                    }
                                }
                                follow_user.followers.unshift({user: user.id});
                                follow_user.save().then(user => {
                                })
                                console.log(user.following);
                                user.following.unshift({user: follow_user.id});
                                user.save().then(user => res.json(user))
                            })
                    }
                }).catch(err => res.status(404).json({errors: {usernotfound: "No user Found"}}))
    });


// @route   POST api/users/unfollow/:id/:follow_id
// @desc    unfllowing user to onther user
// @access  public
router.post(
    "/unfollow/:id/:follow_id",
    (req, res) => {

        passport.authenticate('jwt', {session: false}),
            User.findById(req.params.id)
                .then(user => {
                    if (!user) {
                        return res.status(400).json({errors: {nouser: "your are not a user"}})
                    } else {
                        User.findById(req.params.follow_id)
                            .then(follow_user => {
                                if (!follow_user) {
                                    return res.status(400).json({errors: {nouser: "your are not a user"}})
                                } else {
                                    if (user.following.filter(follwo => follwo.user.toString() === follow_user.id).length === 0) {
                                        return res.status(400).json({errors: {alreadyfollowed: 'you are already not follow that user'}});
                                    }
                                }
                                let followers = follow_user.followers.map(follwoer => follwoer.user.toString()).indexOf(user.id)
                                follow_user.followers.splice(followers, 1);
                                follow_user.save().then(() => {
                                })
                                let following = user.following.map(follwoer => follwoer.user.toString()).indexOf(follow_user.id)
                                user.following.splice(following, 1);
                                user.save().then(user => res.json(user))
                            })

                    }
                }).catch(err => res.status(404).json({errors: {usernotfound: "No user Found"}}))
    });

// @route   GET api/users/following/
// @desc    get all following
// @access  public
router.get(
    "/following/:id",
    (req, res) => {
        passport.authenticate('jwt', {session: false}),
            User.findById(req.params.id, {
                "name": 0,
                "email": 0,
                "password": 0,
                "avatar": 0,
                "data": 0,
                "followers": 0,
            })
                .then(user => {

                    if (!user) {
                        return res.status(400).json({errors: {nouser: "your are not a user"}})
                    }
                    let ids = [...user.following.map(follow => follow.user)];
                    User.find({_id: {$in: ids}})
                        .then(user => res.json(user))
                }).catch(err => res.status(404).json({errors: {usernotfound: "No user Found"}}))
    });

// @route   GET api/users/followers
// @desc    get all followers
// @access  public
router.get(
    "/followers/:id",
    (req, res) => {
        passport.authenticate('jwt', {session: false}),
            User.findById(req.params.id)
                .then(user => {
                    if (!user) {
                        return res.status(400).json({errors: {nouser: "your are not a user"}})
                    }
                    let ids = [...user.followers.map(follower => follower.user)];
                    User.find({_id: {$in: ids}})
                        .then(user => res.json(user)
                        )
                }).catch(err => res.status(404).json({errors: {usernotfound: "No user Found"}}))
    });


// @route   POST api/users/current
// @desc    return current users
// @access  private
router.get("/current", passport.authenticate("jwt", {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            date: req.user.date,
        })
    });
module.exports = router;
