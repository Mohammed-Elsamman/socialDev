const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
router.get('/test', (req, res) => res.json({msg: "user is works"}));


router.post("/register", (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
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
module.exports = router;