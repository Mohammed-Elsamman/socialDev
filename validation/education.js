const getRequiredErrors = require('./getRequiredErrors');
const isEmpty = require('./is-empty');

module.exports = validateEducationInput = data => {
    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    let keys = ['school', 'degree', 'fieldofstudy', 'from']
    let errors = getRequiredErrors(data,keys,{});
    return {
        errors,
        isValid: isEmpty(errors),
    }
};
