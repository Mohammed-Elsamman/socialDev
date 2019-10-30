const validator = require('validator');
const isEmpty = require('./is-empty');
const validateUrl = require('./validateUrl');
const getRequiredErrors = require('./getRequiredErrors');


module.exports = validateProfileInput = data => {
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    let keys = ['linkedin', 'linkedin', 'facebook', 'twitter','youtube','instagram']
    let errors = validateUrl(data,keys,{});
    //check on the length of the handle and if is empty
    if (!validator.isLength(data.handle, {min: 2, max: 40})) errors.handle = "handle must be between 2 and 40 charachters";
    let requierdKeys = ['status','status','status'];
    errors = getRequiredErrors(data,requierdKeys,errors);
    return {
        errors,
        isValid: isEmpty(errors),
    }
};
