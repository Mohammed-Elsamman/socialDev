const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Group = require("../../models/Group")
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
            group: req.body.group,
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
        User.findById(req.user.id)
            .then(user => {
                    let ids = [...user.following.map(follow => follow.user), req.user._id];
                    Post.aggregate([{$match: {user: {$in: ids}}}])
                        .then(posts => {
                            // let newPost = posts.map(post => {
                            //     if (post.group) {
                            //         Group.findById(post.group._id)
                            //             .then(group => {
                            //                 post.group = group
                            //                 return post
                            //             })
                            //     } else {
                            //         return post
                            //     }
                            // })
                            res.json(posts)
                        })
                        .catch(err => res.status(404).json(err))
                }
            ).catch(err => err)

    }
);

// @route   GET api/post/
// @desc    get mypost
// @access  private
router.get('/my_post',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.find({user: req.user.id})
            .then(post => {
                if (!post) {
                    return res.status(404).json({nopst: "there is no post for that user"})
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
            .populate('group', ['name', 'date'])
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                res.json(post[0])
            })
            .catch(err => res.status(404).json(err))
    }
);

// @route   DELETE api/post/like/:id
// @desc    ADD like for post
// @access  private
router.post('/like/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    return res.status(404).json({errors: {nopst: "there is no post"}})
                }
                if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({errors: {alreadyliked: 'User already liked this post'}});
                }

                post.likes.unshift({user: req.user.id});
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({errors: {postnotfound: "No Post Found"}}))
    }
);


// @route   DELETE api/post/unlike/:id
// @desc    REMOVE like for post
// @access  private
router.delete('/unlike/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    return res.status(404).json({errors: {nopst: "there is no post"}})
                }
                if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(404).json({errors: {notliked: "you have not liked this post yet"}})
                }
                let likes = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
                post.likes.splice(likes, 1);
                post.save().then(() => res.json(post))
            })
            .catch(err => res.status(404).json({errors: {postnotfound: "No Post Found"}}))
    }
);


// @route   POST api/comment/:id
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

// @route   DELETE api/post/:id
// @desc    DELETE post
// @access  private
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                if (post.user.toString() !== req.user.id) {
                    res.status(404).json({noauthorized: "user no authorized"})
                }
                post.remove().then(() => res.json({"id": req.params.id}))
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
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({nopst: "there is no post"})
                }
                let comments = post.comments.filter(comment => comment.id === req.params.cid);
                if (comments.length === 0) {
                    res.status(404).json({nocomment: "there is no comment to delete"})
                }
                if (comments[0].user.toString() !== req.user.id || comments[0].user.toString() !== post.user.toString()) {
                    res.status(404).json({noauthorized: "user no authorized"})
                }
                let comment = post.comments.map(cmnt => cmnt.id).indexOf(req.params.cid)
                post.comments.splice(comment, 1);
                post.save().then(() => res.json(post))
            })
            .catch(err => res.status(404).json(err))
    }
);
module.exports = router;