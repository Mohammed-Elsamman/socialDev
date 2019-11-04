const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =  getRequiredErrors = (data,keys,errors) => {
    keys.forEach(key=>{
        console.log(data[key]);
        if(isEmpty(data[key])) errors[key] = `${key} is required`
    });
    return errors
}