const validator = require('validator');

module.exports =  getRequiredErrors = (data,keys,errors) => {
    keys.forEach(key=>{
        if(validator.isEmpty(data[key])) errors[key] = `${key} is required`
    });
    return errors
}