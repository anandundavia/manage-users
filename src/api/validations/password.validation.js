const Joi = require('joi');
const userSchema = require('../configuration/user.schema');

const changePassword = () => {
    const body = {};
    const schema = userSchema.get();

    const key = schema.keyField.name;
    const isKeyEmail = schema.keyField.isEmail;
    const password = schema.passwordField.name;
    const confirm = schema.confirmPasswordField.name;
    const passwordLen = schema.passwordField.minLength;
    const newPassword = schema.newPasswordField.name;

    body[key] = isKeyEmail
        ? Joi.string().email().required() // Validation for email
        : Joi.string().required(); // Validation for username

    // TODO: should there be any complexity for password?
    body[password] = Joi.string().required();

    body[newPassword] = Joi.string().min(passwordLen).invalid(Joi.ref(password)).required();
    body[confirm] = Joi.string().valid(Joi.ref(newPassword)).required();

    // .pattern(/./, Joi.any()) basically means that anything besides all this keys is fine
    // This lets user add the custom information to database while signing up
    return Joi.object().keys(body).pattern(/./, Joi.any());
};


const reset = () => {
    const body = {};
    const schema = userSchema.get();
    if (!schema) return body;

    const key = schema.keyField.name;
    const isKeyEmail = schema.keyField.isEmail;

    body[key] = isKeyEmail
        ? Joi.string().email().required() // Validation for email
        : Joi.string().required(); // Validation for username

    return Joi.object().keys(body).pattern(/./, Joi.any());
};

module.exports = { reset, changePassword };
