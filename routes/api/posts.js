const express = require("express");
const router = express.Router();
const passport = require("passport");
const post = require("../../models/Post");
const user = require("../../models/User");
const validationPostInpot = require("../../validation/post")

router.get('/test', (req, res) => res.json({msg: "posts is works"}));


// @route   POST api/post/
// @desc    create post
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validationPostInpot(req.body);
        if (!isValid) {
            return res.status(404).json({errors})
        }
        const newPost = new post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
        });
        newPost.save().then(post => res.json(post))
    }
);

// @route   GET api/post/
// @desc    get all post
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {}
        post.find()
            .then(posts => {
                if (!post) {
                    errors.noPosts = "there is no posts"
                    res.status(404).json(errors)
                }
                res.json(posts)
            })
            .catch(err => res.status(404).json(err))
    }
);

// @route   GET api/post/
// @desc    get mypost post
// @access  private
router.get('/my_post',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {}
        post.find({user: req.user.id})
            .then(posts => {
                if (!post) {
                    errors.noPosts = "there is no posts for that user";
                    res.status(404).json(errors)
                }
                res.json(posts)
            })
            .catch(err => res.status(404).json(err))
    }
);


// @route   GET api/post/
// @desc    get one post
// @access  private
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {}
        post.find({_id: req.params.id})
            .then(posts => {
                if (!post) {
                    errors.noPosts = "there is no post";
                    res.status(404).json(errors)
                }
                res.json(posts)
            })
            .catch(err => res.status(404).json(err))
    }
);
module.exports = router;