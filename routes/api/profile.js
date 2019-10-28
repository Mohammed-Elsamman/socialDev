const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport")

//load profile model
const Profile = require("../../models/profile");
//load User model
const User = require("../../models/User");
//load function of validation prfile input
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile/test
// @desc    test profile route
// @access  public
router.get('/test', (req, res) => res.json({msg: "profile is works"}));

// @route   GET api/profile/
// @desc    get profile
// @access  private
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        Profile.findOne({user: req.user.id})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "there is no profile for this user"
                    res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    });

// @route   GET api/profile/handle/:handle
// @desc    get profile by handel
// @access  public
router.get("/handle/:handle", (req, res) => {
    const errors = {}
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user"
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
});

// @route   GET api/profile/user/user/:user_id
// @desc    get profile by user_id
// @access  public
router.get("/user/:user_id", (req, res) => {
    const errors = {}
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user"
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
});


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'avatar', 'follwoers'])
        .then(profiles => res.json(profiles))
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});

// @route   GET api/profile/suggest
// @desc    Get suggestions profiles
// @access  Public
router.get('/suggestions',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let myProfile;
        let allUserProfile;
        const userProfile = Profile.find({user: req.user._id})
            .then(profile => {
                myProfile = profile;
            })
            .catch(err => res.status(404).json({profile: 'There are no profiles'}));
        const usersProfile = Profile.find({}, {
            experience: 0,
            social: 0,
            education: 0,
            company: 0,
            location: 0,
            githubusername: 0,
        })
            .populate('user', ['follwoing','follwoers', 'avatar', 'name'])
            .then(profiles => {
                allUserProfile = profiles
            })
            .catch(err => err)
        Promise.all([userProfile, usersProfile])
            .then(() => {
                let profile = myProfile[0];
                let allProfiles = allUserProfile;
                let suggestions = allProfiles.filter(prof => {
                        let isFollwoer = prof.user.follwoers.map(follwoer => follwoer.user._id.toString()).indexOf(req.user.id)
                        console.log(isFollwoer);
                        console.log(prof.user.name);
                        if (profile.skills.some(skill => (prof.skills.includes(skill))) && req.user.id !== prof.user.id && isFollwoer < 0) {
                            return prof
                        }
                    }
                );
                if (suggestions.length <= 4) {
                    console.log(2);
                    return res.json(suggestions)
                } else {
                    let startProfile = Math.floor(Math.random()) * (suggestions.length - 4)
                    return suggestions.slice(startProfile, startProfile + 4)
                }
            })
    })


// @route   POST api/profile/
// @desc    create profile
// @access  private
router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateProfileInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(404).json({errors})
        }
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (typeof req.body.skills !== "undefined") {
            profileFields.skills = req.body.skills.split(',');
        }
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;

        profileFields.social = {};
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

        Profile.findOne({user: req.user.id})
            .then(profile => {
                //update the profile
                if (profile) {
                    Profile.findOneAndUpdate(
                        {user: req.user.id},
                        {$set: profileFields},
                        {new: true},
                    ).then(profile => res.json(profile))
                } else {
                    //    create profile

                    Profile.findOne({handle: profileFields.handle})
                        .then(profile => {
                            if (profile) {
                                errors.handle = "That handle already exists";
                                rse.status(400).json(errors);
                            }

                            // save profile
                            new Profile(profileFields)
                                .save()
                                .then(profile => res.json(profile))
                        });
                }
            });
    });

// @route DELETE api/profile/delete
// @desc delete user and profile
// @access Private

router.delete(
    "/",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOneAndRemove({user: req.user.id}).then(() => {
            User.findOneAndRemove({_id: req.user.id}).then(() => {
                res.json({success: true})
            });
        })
    }
);

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  private

router.post(
    '/experience',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const {errors, isValid} = validateExperienceInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(404).json({errors})
        }

        Profile.findOne({user: req.user.id})
            .then(profile => {
                const newExpe = {
                    "title": req.body.title,
                    "company": req.body.company,
                    "location": req.body.location,
                    "from": req.body.from,
                    "to": req.body.to,
                    "current": req.body.current,
                    "description": req.body.description,
                };
                profile.experience.unshift(newExpe)
                profile.save().then(profile => res.json(profile));
                // Profile.save().then(profile => res.json(profile))
            });

    });


// @route   POST api/profile/education
// @desc    add education to profile
// @access  private

router.post(
    '/education',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const {errors, isValid} = validateEducationInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(404).json({errors})
        }

        Profile.findOne({user: req.user.id})
            .then(profile => {
                const newEdu = {
                    "school": req.body.school,
                    "degree": req.body.degree,
                    "fieldofstudy": req.body.fieldofstudy,
                    "from": req.body.from,
                    "to": req.body.to,
                    "current": req.body.current,
                    "description": req.body.description,
                };
                profile.education.unshift(newEdu)
                profile.save().then(profile => res.json(profile));
                // Profile.save().then(profile => res.json(profile))
            });

    });

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access Private

router.delete(
    "/experience/:exp_id",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                let removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id)
                profile.experience.splice(removeIndex, 1)
                profile.save().then(profile => res.json(profile))

            })
            .catch(err => res.json(err))
    }
);

// @route DELETE api/profile/education/:edu_id
// @desc delete education from profile
// @access Private

router.delete(
    "/education/:edu_id",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                let removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);
                profile.education.splice(removeIndex, 1);
                profile.save().then(profile => res.json(profile))

            })
            .catch(err => res.json(err))
    }
);

module.exports = router;
