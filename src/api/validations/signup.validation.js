const Joi = require('joi');
const userSchema = require('../configuration/user.schema');

const signup = () => {
    const body = {};
    const schema = userSchema.get();
    if (!schema) return body;

    const key = schema.keyField.name;
    const isKeyEmail = schema.keyField.isEmail;
    const password = schema.passwordField.name;
    const passwordLen = schema.passwordField.minLength;
    const confirm = schema.confirmPasswordField.name;

    body[key] = isKeyEmail
        ? Joi.string().email().required() // Validation for email
        : Joi.string().required(); // Validation for username

    // TODO: should there be any complexity for password?
    body[password] = Joi.string().min(passwordLen).required();

    // Password should be as same as the confirm field. (server side validation)
    /* eslint-disable-next-line max-len */
    body[confirm] = Joi.string().valid(Joi.ref(schema.passwordField.name)).required();

    // .pattern(/./, Joi.any()) basically means that anything besides all this keys is fine
    // This lets user add the custom information to database while signing up
    return Joi.object().keys(body).pattern(/./, Joi.any());
};

module.exports = { signup };

