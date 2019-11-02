const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Group = require("../../models/Group")
const validationPostInpot = require("../../validation/post");
const validationCommentInpot = require("../../validation/comment");

// @route   POST api/post/
// @desc    create post
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const {errors, isValid} = validationPostInpot(req.body);
            if (!isValid)
                return res.status(404).json({errors});

            const {name, text, avatar, group} = req.body;
            const newPost = new Post({
                text, name, avatar, group,
                user: req.user.id,
            });
            const post = await newPost.save();
            await res.json(post)
        } catch (e) {
            await res.json(e)
        }

    }
);

// @route   GET api/post/
// @desc    get all post
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            let ids = [...user.following.map(follow => follow.user), req.user._id];
            const posts = await Post.aggregate([{$match: {user: {$in: ids}}}]);
            await res.json(posts)
        } catch (err) {
            res.status(404).json(err)
        }
    }
);

// @route   GET api/post/
// @desc    get mypost
// @access  private
router.get('/my_post',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const posts = await Post.find({user: req.user.id});
            await res.json(posts)
        } catch (err) {
            res.status(404).json({nopst: "there is no post for that user"});
        }
    }
);

// @route   GET api/post/
// @desc    get one post
// @access  private
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const post = await Post.find({_id: req.params.id})
                .populate('group', ['name', 'date'])
            await res.json(post[0])
        } catch (err) {
            res.status(404).json({nopst: "there is no post"})
        }
    }
);

// @route   DELETE api/post/like/:id
// @desc    ADD like for post
// @access  private
router.post('/like/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
                return res.status(400).json({errors: {alreadyliked: 'User already liked this post'}});
            post.likes.unshift({user: req.user.id});
            post = await post.save();
            await res.json(post)
        } catch (err) {
            res.status(404).json({errors: {postnotfound: "No Post Found"}})
        }
    }
);

// @route   DELETE api/post/unlike/:id
// @desc    REMOVE like for post
// @access  private
router.delete('/unlike/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
                return res.status(404).json({errors: {notliked: "you have not liked this post yet"}});

            let likes = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(likes, 1);
            post = await post.save();
            await res.json(post)
        } catch (err) {
            res.status(404).json({errors: {postnotfound: "No Post Found"}})
        }
    }
);

// @route   POST api/comment/:id
// @desc    ADD comment for post
// @access  private
router.post('/comment/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const {errors, isValid} = validationCommentInpot(req.body);
        if (!isValid) return res.status(404).json({errors});
        try {
            let post = await Post.findById(req.params.id);
            const {name, text, avatar, group} = req.body;
            const newComment = new Post({
                text, name, avatar, group,
                user: req.user.id,
            });
            post.comments.unshift(newComment);
            post = await post.save();
            await res.json(post)
        } catch (err) {
            res.status(404).json({errors: {postnotfound: "No Post Found"}})
        }
    }
);

// @route   DELETE api/post/:id
// @desc    DELETE post
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            if (post.user.toString() !== req.user.id)
                return res.status(404).json({noauthorized: "user no authorized"});
            post.remove();
            await res.json({"id": req.params.id})
        } catch (err) {
            res.status(404).json({nopst: "there is no post"})
        }
    }
);

// @route   POST api/post/comment/:id/:cid
// @desc    DELETE comment on post
// @access  private
router.delete('/comment/:id/:cid',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            let comments = post.comments.filter(comment => comment.id === req.params.cid);
            if (comments.length === 0)
                return res.status(404).json({nocomment: "there is no comment to delete"});
            if (comments[0].user.toString() !== req.user.id || comments[0].user.toString() !== post.user.toString())
                res.status(404).json({noauthorized: "user no authorized"});
            let comment = post.comments.map(cmnt => cmnt.id).indexOf(req.params.cid);
            post.comments.splice(comment, 1);
            post = await post.save();
            await res.json(post)
        } catch (err) {
            res.status(404).json({nopst: "there is no post"})
        }
    }
);
module.exports = router;