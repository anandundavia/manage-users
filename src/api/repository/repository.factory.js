const Joi = require('joi');

const repositorySchema = require('../configuration/repository.schema');
const logger = require('../utils/logger')(module);

// It will have reference to all the repositories resigtered on runtime
// repositories.custom_repo will yeild the implementation of the custom_repo
// which has all the required functions
const repositories = {};

// Validation schema for functions
// TODO: Validate return type as well
const validate = (repo) => {
    const schema = Joi.object().keys({
        connect: Joi.func().arity(0).required() // => arity means number of arguments
            .error(new Error('\'connect\' must be a function which would take exactly 0 arguments')),
        exists: Joi.func().arity(1).required()
            .error(new Error('\'exists\' must be a function which would take exactly 1 argument ( the unique key using which you identify the users )')),
        create: Joi.func().arity(1).required()
            .error(new Error('\'create\' must be a function which would take exactly 1 argument ( the user object you want to add in the database )')),
        find: Joi.func().arity(1).required()
            .error(new Error('\'find\' must be a function which would take exactly 1 argument ( the unique key using which you identify the users )')),
        update: Joi.func().arity(2).required()
            .error(new Error('\'update\' must be a function which would take exactly 2 argument ( the unique key and the updates to be made )')),
        disconnect: Joi.func().arity(0).required()
            .error(new Error('\'disconnect\' must be a function which would take exactly 0 argument')),
    }).pattern(/./, Joi.any()); // Any other helper functions user might want to pass in the repository is fine
    return Joi.validate(repo, schema);
};

/**
 * Adds the repository implementation which can be used later
 * The name of the repository should be unique,
 * otherwise the implementation would be overwritten.
 * It also makes the entry in repositorySchema such that it
 * passes the validation
 * @param {string} name Unique name for each repository implementation
 * @param {string} repository Implementation of the repository
 */
exports.add = (name, repository) => {
    const result = validate(repository);
    if (result.error) {
        throw new Error(result.error);
    }
    // If the implementation already exists, warn the user about it
    if (repositorySchema.repository.has(name)) {
        logger.warn(`implementation exists for repository named '${name}' overridden`);
    }
    // Add it to the schema so that the schema validation works.
    // The overridden add function leads to regeneration of the validation shcema
    repositorySchema.repository.add(name);
    // Save the repository in the memory
    repositories[name] = repository;
};

exports.get = (name) => {
    if (!repositories[name]) {
        logger.error(`no implementation exists for repository named '${name}'`);
        return null;
    }
    return repositories[name];
};
