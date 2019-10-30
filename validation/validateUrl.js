const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateUrl = (data, keys, errors) => {
    keys.forEach(key => {
        if (!isEmpty(data[key]))
            if (!validator.isURL(data[key])) errors[key] = `${key} not a valied URL`
    });
    return errors
}
