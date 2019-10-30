const validator = require('validator');
const isEmpty = require('./is-empty');
const getRequiredErrors = require('./getRequiredErrors');


module.exports = validateGroupInput = data => {
    data.name = validator.isEmpty(data.name) ? data.name : "";
    data.description = validator.isEmpty(data.description) ? data.description : "";
    data.interestedin = validator.isEmpty(data.interestedin) ? data.interestedin : "";
    let d =validator.isEmpty(data.name)
    console.log(d);
    let keys = ['name', 'description', 'interestedin']
    let errors = getRequiredErrors(data,keys,{});
    return {
        errors,
        isValid: validator.isEmpty(errors),
    }
};