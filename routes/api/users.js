const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const secretOrKey = require('../../config/keys').secretOrKey;
const User = require("../../models/User");
router.get('/test', (req, res) => res.json({msg: "user is works"}));

// @route   POST api/users/register
// @desc    register users
// @access  public
router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "Email Already exists"})
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
                            .catch(err => console.log(ess))
                    })
                })
            }
        })
});

// @route   POST api/users/login
// @desc    login users && return jwt
// @access  public
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //find user by email
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(4040).json({email: "this email doesn't existe"})
            }
            //compare password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {id: user.id, name: user.name, avatar: user.avatar};
                    jwt.sign(payload, secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "bearer " + token
                            })
                        });
                } else {
                    res.status(404).json({password: "this password incorrect"})
                }
            })
        })
});

module.exports = router;