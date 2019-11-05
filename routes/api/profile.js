const express = require("express");
const router = express.Router();
const passport = require("passport");
//load profile & User model
const Profile = require("../../models/profile");
const User = require("../../models/User");
//load function of validation prfile input
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile/
// @desc    get profile
// @access  private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const errors = {};
        try {
            let profile = await Profile.findOne({user: req.user.id})
                .populate('user', ['name', 'avatar'])
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            console.log(profile);
            await res.json(profile)
        } catch (err) {
            res.status(404).json(err)
        }
    });

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  public
router.get("/handle/:handle", async (req, res) => {
    const errors = {}
    try {
        const profile = await Profile.findOne({handle: req.params.handle})
            .populate('user', ['followers', 'avatar', 'name']);
        return await res.json(profile)
    } catch (e) {
        errors.noprofile = "there is no profile for this user";
        return res.status(404).json(errors)
    }
});

// @route   GET api/profile/user/user/:user_id
// @desc    get profile by user_id
// @access  public
router.get("/user/:user_id", async (req, res) => {
    const errors = {}
    try {
        const profile = await Profile.findOne({user: req.params.user_id})
            .populate('user', ['name', 'avatar'])
        return await res.json(profile)
    } catch (e) {
        errors.noprofile = "there is no profile for this user";
        return res.status(404).json(errors)
    }
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
    const errors = {}
    try {
        const profile = await Profile.find()
            .populate('user', ['name', 'avatar', 'followers'])
        return await res.json(profile)
    } catch (e) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors)
    }
});

// @route   GET api/profile/suggest
// @desc    Get suggestions profiles
// @access  Public
router.get('/suggestions',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {

        const myProfile = await Profile.find({user: req.user._id})[0]
        const allUserProfile = await Profile.find({}, {
            experience: 0, social: 0, education: 0,
            company: 0, location: 0, githubusername: 0,
        }).populate('user', ['following', 'followers', 'avatar', 'name'])

        Promise.all([myProfile, allUserProfile])
            .then(() => {
                let suggestions = allUserProfile.filter(prof => {
                        let isFollwoer = prof.user.followers.map(follwoer => follwoer.user._id.toString()).indexOf(req.user.id);
                        if (myProfile.skills.some(skill => (prof.skills.includes(skill))) && req.user.id !== prof.user.id && isFollwoer < 0)
                            return prof
                    }
                );
                if (suggestions.length <= 4) {
                    return res.json(suggestions)
                } else {
                    let startProfile = Math.floor(Math.random()) * (suggestions.length - 4)
                    return suggestions.slice(startProfile, startProfile + 4)
                }
            })
    });


// @route   POST api/profile/
// @desc    create profile
// @access  private
router.post('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        //check validation
        const {errors, isValid} = validateProfileInput(req.body);
        if (!isValid)
            return res.status(404).json({errors});

        const profileFields = {};
        const user = req.user.id
        profileFields.user = user;
        const {
            handle, status, company, website, location, skills, bio,
            githubusername, facebook, twitter, youtube, instagram, linkedin
        } = req.body;
        if (handle) profileFields.handle = handle;
        if (status) profileFields.status = status;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (typeof skills !== "undefined")
            profileFields.skills = skills.split(',');
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        profileFields.social = {};
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (youtube) profileFields.social.youtube = youtube;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({user})
            //update the profile
            if (profile) {
                profile = await Profile.findOneAndUpdate({user}, {$set: profileFields}, {new: true});
                await User.findOneAndUpdate(
                    {_id: req.user._id}, {$set: {handle: profileFields.handle}}, {new: true},
                );
            } else {
                //    create profile
                profile = await Profile.findOne({handle: profileFields.handle})
                if (profile) {
                    errors.handle = "That handle already exists";
                    res.status(400).json(errors);
                }
                // save profile
                profile = new Profile(profileFields)
                profile = await profile.save();
                User.findOneAndUpdate(
                    {id: req.user.id}, {$set: {handle: profileFields.handle}}, {new: true},
                );
            }
            await res.json(profile)
        } catch (e) {
            errors.noprofile = "there are no profile for that user";
            return res.status(404).json(errors)
        }

    });

// @route DELETE api/profile/delete
// @desc delete user and profile
// @access Private
router.delete("/",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            await Profile.findOneAndRemove({user: req.user.id});
            await User.findOneAndRemove({_id: req.user.id});
            return await res.json({success: true});
        } catch (e) {
            return res.status(404).json(e)
        }
    }
);

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  private
router.post('/experience',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        //check validation
        const {errors, isValid} = validateExperienceInput(req.body);
        if (!isValid)
            return res.status(404).json({errors})

        try {
            let profile = await Profile.findOne({user: req.user.id})
            const {title, company, location, from, to, current, description} = req.body;
            const newExpe = {
                title, company, to, from,
                location, current, description,
            };
            profile.experience.unshift(newExpe);
            profile = await profile.save();
            await res.json(profile)
        } catch (e) {
            errors.noprofile = "there are no profile for that user";
            return res.status(404).json(errors)
        }
    });

// @route   POST api/profile/education
// @desc    add education to profile
// @access  private
router.post('/education',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        //check validation
        const {errors, isValid} = validateEducationInput(req.body);
        if (!isValid)
            return res.status(404).json({errors})

        try {
            let profile = await Profile.findOne({user: req.user.id})
            const {school, degree, fieldofstudy, from, to, current, description} = req.body;
            const newEdu = {school, degree, fieldofstudy, to, from, current, description};
            profile.education.unshift(newEdu)
            profile = await profile.save();
            await res.json(profile)
        } catch (e) {
            errors.noprofile = "there are no profile for that user";
            return res.status(404).json(errors)
        }
    });

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access Private
router.delete("/experience/:exp_id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let profile = await Profile.findOne({user: req.user.id})
            let removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex, 1)
            profile = await profile.save();
            await res.json(profile)
        } catch (e) {
            return res.status(404).json({errors: {noprofile: "there are no profile for that user"}})
        }
    });

// @route DELETE api/profile/education/:edu_id
// @desc delete education from profile
// @access Private
router.delete("/education/:edu_id",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            let profile = await Profile.findOne({user: req.user.id})
            let removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);
            profile.education.splice(removeIndex, 1);
            profile = await profile.save()
            await res.json(profile)
        } catch (e) {
            return res.status(404).json({errors: {noprofile: "there are no profile for that user"}})
        }
    });

module.exports = router;