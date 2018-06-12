const logger = require('../utils/logger');
const Joi = require('joi');

// Set of all the repositories being available
const repository = new Set([]);

const schema = () => Joi.object({
    repository: Joi.string().valid(...repository.values()).required(),
    uri: Joi.string().uri().required(),
    collection: Joi.string().required(),
    database: Joi.string().required(),
});

const validation = schema();

/**
 * This is required because we will need to generate the
 * validation object every time there is addition in the
 * repository set.
 * You might want to expose more methods of set here
 * TODO: Find a design pattern to achieve that
 */
const setWrapper = {
    add(value) {
        const that = repository.add(value);
        Object.assign(validation, schema());
        return that;
    },
    has(value) {
        return repository.has(value);
    },
};

/**
 * The 'DEFAULT' schema for the repository in memory.
 * Should we store it in more persistence storage?
 */
let REPOSITORY_SCHEMA = {
    repository: 'mongo', // Name of the repository. Can be any random name
    uri: 'mongodb://localhost:27017/users',
    database: 'user_management',
    collection: 'users',
};

const validateSchema = (schemaToValidate) => {
    const result = Joi.validate(schemaToValidate, validation);
    if (result.error) {
        throw new Error(result.error);
    }
};

const set = (schemaToSet) => {
    logger.info('setting repository schema');
    validateSchema(schemaToSet);
    REPOSITORY_SCHEMA = Object.assign({}, schemaToSet);
};

const get = () => REPOSITORY_SCHEMA;


module.exports = {
    get,
    set,
    repository: setWrapper,
};
