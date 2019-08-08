const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //check on the length of the name and if is empty
    if (!validator.isLength(data.name, {min: 3, max: 30})) {
        console.log(data.name);
        errors.name = "name must be between 3 and 30 charachters"
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "name is required"
    }
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

    if (validator.isEmpty(data.password2)) {
        errors.password = "confirm password is required"
    }
    //check if the tow password field are equl or not
    if (!validator.equals(data.password != data.password2)) {
        errors.password = "the tow password field are diffrent"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
};