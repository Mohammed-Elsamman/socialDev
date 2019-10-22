const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProfileInput = data => {
    const errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    //check on the length of the handle and if is empty
    if (!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = "handle must be between 2 and 40 charachters"
    }

    if (isEmpty(data.status)) {
        errors.status = "profile status is required"
    }
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = "not a valied URL"
        }
    }
    if (!isEmpty(data.facebook)) {
        console.log(data.facebook)
        if (!validator.isURL(data.facebook)) {
            errors.facebook = "not a valied URL"
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = "not a valied URL"
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = "not a valied URL"
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = "not a valied URL"
        }
    }
    if (!isEmpty(data.linkedin)) {
        console.log(data.linkedin)
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = "not a valied URL"
        }
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }
};
