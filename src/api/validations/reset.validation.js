const Joi = require('joi');
const userSchema = require('../configuration/user.schema');

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

module.exports = { reset };

