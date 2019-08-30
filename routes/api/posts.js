const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const validationPostInpot = require("../../validation/post");
const validationCommentInpot = require("../../validation/comment");

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
        const newPost = new Post({
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
    (req, res) => {
        Post.find()
            .then(post => {
                if (!post) {
                    res.status(404).json({noPosts: "there is no posts"})
                }
                res.json(post)
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
        Post.find({user: req.user.id})
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post for that user"})
                }
                res.json(post)
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
        Post.find({_id: req.params.id})
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                res.json(post)
            })
            .catch(err => res.status(404).json(err))
    }
);

// @route   DELETE api/post/:id
// @desc    ADD like for post
// @access  private
router.post('/like/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    res.status(404).json({alreadyliked: "User already liked this post"})
                }

                post.likes.unshift({user: req.user.id});
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({postnotfound: "No Post Found"}))
    }
);


// @route   DELETE api/comment/:id
// @desc    ADD comment for post
// @access  private
router.post('/comment/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validationCommentInpot(req.body);
        if (!isValid) {
            return res.status(404).json({errors})
        }
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                const newComment = {
                    user: req.user.id,
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar
                }
                post.comments.unshift(newComment);
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({postnotfound: "No Post Found"}))
    }
);

// @route   POST api/post/like/:id
// @desc    DELETE post
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log(req.params.id);
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                if (post.user.toString() !== req.user.id) {
                    res.status(404).json({noauthorized: "user no authorized"})
                }
                post.remove().then(() => res.json({success: true}))
            })
            .catch(err => res.status(404).json(err))
    }
);

// @route   POST api/post/comment/:id/:cid
// @desc    DELETE comment on post
// @access  private
router.delete('/comment/:id/:cid',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log(req.params.id);
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                comments = post.comments.filter(comment => comment.id === req.params.cid);
                console.log(comments);
                if(comments.length === 0){
                    res.status(404).json({nocomment: "there is no comment to delete"})
                }
                if(comments[0].user.toString() !== req.user.id || comments[0].user.toString() !== post.user.toString()){
                    res.status(404).json({noauthorized: "user no authorized"})
                }
                comment = post.comments.map(cmnt => cmnt.id ).indexOf(req.params.cid)
                console.log(comment);
                post.comments.splice(comment,1);
                post.save().then(() => res.json(post))
            })
            .catch(err => res.status(404).json(err))
    }
);
module.exports = router;