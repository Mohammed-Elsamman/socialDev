const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateGroupInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.interestedin = !isEmpty(data.interestedin) ? data.interestedin : "";

    if (validator.isEmpty(data.name)) {
        errors.text = "name is required"
    }
    if (validator.isEmpty(data.description)) {
        errors.description = "description is required"
    }
    if (validator.isEmpty(data.interestedin)) {
        errors.interestedin = "interestedin is required"
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }
};