const logger = require('../utils/logger');
const Joi = require('joi');


const validation = Joi.object().keys({
    // Key field is the unique field which contains the
    // unique key to identify the users.For example: 'email' or 'user_name'
    // If you set keyField.name = 'email', then
    // That means the post body will have user name in req.body.email field
    keyField: Joi.object().keys({
        name: Joi.string().required(),
        isEmail: Joi.boolean(),
    }).required(),
    // Same explanation as above
    passwordField: Joi.object().keys({
        name: Joi.string().required(),
        minLength: Joi.number().min(6).required(),
    }).required(),
    confirmPasswordField: Joi.object().keys({
        name: Joi.string().required(),
    }).required(),
});

// Default user schema
let USER_SCHEMA = {
    keyField: {
        name: 'username', // username will be in req.body.username
        isEmail: false,
    },
    passwordField: {
        name: 'password', // password will be in req.body.password
        minLength: 6,
    },
    confirmPasswordField: {
        name: 'confirm', // confirmation password will be in req.body.confirm
    },
};

const validateSchema = (schema) => {
    const result = Joi.validate(schema, validation);
    if (result.error) {
        throw new Error(result.error);
    }
};

const set = (schemaToSet) => {
    logger.info('setting user schema');
    validateSchema(schemaToSet);
    USER_SCHEMA = Object.assign({}, schemaToSet);
};

const get = () => USER_SCHEMA;

/**
 * TODO: Should we consider saving schema in persistence rather than just memory?
 */
module.exports = { get, set };
