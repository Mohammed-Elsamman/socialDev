const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //check if the email is valied or empty
    if (!validator.isEmail(data.email)) {
        errors.email = "email is invalid"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "email is required"
    }
    //check on the length of the password and if is empty
    if (!validator.isLength(data.password, {min: 5, max: 20})) {
        errors.password = "password must be between 5 and 20 charachters"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "password is required"
    }


    return {
        errors,
        isValid: isEmpty(errors),
    }
};