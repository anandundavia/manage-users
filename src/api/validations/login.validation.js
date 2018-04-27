const Joi = require('joi');
const userSchema = require('../configuration/user.schema');

const login = () => {
    const body = {};
    const schema = userSchema.get();
    if (!schema) return body;

    const key = schema.keyField.name;
    const isKeyEmail = schema.keyField.isEmail;
    const password = schema.passwordField.name;

    body[key] = isKeyEmail
        ? Joi.string().email().required() // Validation for email
        : Joi.string().required(); // Validation for username

    // TODO: should there be any complexity for password?
    body[password] = Joi.string().required();

    // .pattern(/./, Joi.any()) basically means that anything besides all this keys is fine
    // This lets user add the custom information to databse while signing up
    return Joi.object().keys(body).pattern(/./, Joi.any());
};

module.exports = { login };

