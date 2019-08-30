const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = data => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (validator.isEmpty(data.text)) {
        errors.text = "text is required"
    }


    return {
        errors,
        isValid: isEmpty(errors),
    }
};