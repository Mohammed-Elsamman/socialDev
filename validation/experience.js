const isEmpty = require('./is-empty');
const getRequiredErrors = require('./getRequiredErrors');

module.exports = validateExperienceInput = data => {
    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    let keys = ['title', 'company', 'location', 'from']
    let errors = getRequiredErrors(data,keys,{})
    return {
        errors,
        isValid: isEmpty(errors),
    }
};
