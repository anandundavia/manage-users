const Joi = require('joi');

const repositorySchema = require('../configuration/repository.schema');
const logger = require('../utils/logger')(module);

const repositories = {};

const validate = (repo) => {
    const schema = Joi.object().keys({
        connect: Joi.func().arity(0).required(),
        exists: Joi.func().arity(1).required(),
        create: Joi.func().arity(1).required(),
        find: Joi.func().arity(1).required(),
    }).pattern(/./, Joi.any());
    return Joi.validate(repo, schema);
};

exports.add = (name, repository) => {
    const result = validate(repository);
    if (result.error) {
        throw new Error(result.error);
    }
    if (repositorySchema.repository.has(name)) {
        logger.warn(`implementation exists for repository named '${name}' overridden`);
    }
    repositorySchema.repository.add(name);
    repositories[name] = repository;
};

exports.get = (name) => {
    if (!repositories[name]) {
        logger.error(`no implementation exists for repository named '${name}'`);
        return null;
    }
    return repositories[name];
};
